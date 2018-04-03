import { async, ComponentFixture, TestBed, TestModuleMetadata } from '@angular/core/testing';

import { ArticleComponent } from './article.component';
import { setUpTestBed } from '../../test.common.spec';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { click } from '../utils';
import { Article } from './article.model';
import { By } from '@angular/platform-browser';

describe('ArticleComponent', () => {
  let component: ArticleComponent;
  let fixture: ComponentFixture<ArticleComponent>;
  const mockLink = 'https://mockURL/';

  class ArticleCmp {
    static get form(): DebugElement {
      return fixture.debugElement.query(By.css('form'));
    }
  }

  setUpTestBed(<TestModuleMetadata>{
    declarations: [ ArticleComponent ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
  });


  beforeAll(() => {
    fixture = TestBed.createComponent(ArticleComponent);
    component = fixture.debugElement.componentInstance;
    component.article = new Article('', '');
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to call upvote on an article', () => {
    spyOn(component.article, 'upvote');
    component.upvote();
    expect(component.article.upvote).toHaveBeenCalled();
  });

  it('should be able to upvote an article', () => {
    const art = new Article('', '', 5);
    art.upvote();
    expect(art.votes).toEqual(6);
  });

  it('should be able to call downvote on an article', () => {
    spyOn(component.article, 'downvote');
    component.downvote();
    expect(component.article.downvote).toHaveBeenCalled();
  });

  it('should be able to downvote an article', () => {
    const art = new Article('', '', 5);
    art.downvote();
    expect(art.votes).toEqual(4);
  });

  it('should be able to delete an article', () => {
    component.delete();
    expect(component.article).toBeNull();
  });

  it('should be able to initialize Articles', () => {
    const mockTitle = 'MockTitle';
    const art = new Article(mockTitle, mockLink, 6);

    expect(art.title).toEqual(mockTitle);
    expect(art.link).toEqual(mockLink);
    expect(art.votes).toEqual(6);
  });

  it('should have votes default to 0 for new Articles', () => {
    const art = new Article('', '');
    expect(art.votes).toEqual(0);
  });

  it('should be able to extract a domain from an url', () => {
    const art = new Article('', `${mockLink}path`);

    expect(art.domain).toEqual(`mockURL`);
  });


});
