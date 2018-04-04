import { async, ComponentFixture, TestBed, TestModuleMetadata } from '@angular/core/testing';

import { ArticleComponent } from './article.component';
import { setUpTestBed } from '../../test.common.spec';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement, Component } from '@angular/core';
import { click } from '../test-utils';
import { Article } from './article.model';
import { By } from '@angular/platform-browser';
import { AppComponent } from '../app.component';


describe('ArticleComponent', () => {
  let component: ArticleComponent;
  let fixture: ComponentFixture<ArticleComponent>;
  const mockLink = 'https://mockurl/';

  class ArticleCmp {
    static get votes(): DebugElement {
      return fixture.debugElement.query(By.css('.votes'));
    }

    static get votesValue(): string {
      return fixture.debugElement.query(By.css('.votes .value')).nativeElement.textContent.trim();
    }

    static get votesLabel(): string {
      return fixture.debugElement.query(By.css('.votes .label')).nativeElement.textContent.trim();
    }

    static articleContainer(): DebugElement {
      return fixture.debugElement.query(By.css('.twelve.wide'));
    }

    static get articleHeader(): DebugElement {
      return fixture.debugElement.query(By.css('.header'));
    }

    static get articleHeaderLabel(): string {
      return ArticleCmp.articleHeader.nativeElement.textContent.trim();
    }

    static get articleMeta(): DebugElement {
      return fixture.debugElement.query(By.css('.meta'));
    }

    static get articleMetaLabel(): string {
      return ArticleCmp.articleMeta.nativeElement.textContent.trim();
    }

    static get articleActionsList(): DebugElement {
      return fixture.debugElement.query(By.css('ul'));
    }

    static get articleActionUpvote(): DebugElement {
      return fixture.debugElement.query(By.css('ul li:nth-child(1) a'));
    }

    static get articleActionUpvoteIcon(): DebugElement {
      return fixture.debugElement.query(By.css('ul li:nth-child(1) i'));
    }

    static get articleActionUpvoteText(): string {
      return fixture.debugElement.query(By.css('ul li:nth-child(1)')).nativeElement.textContent.trim();
    }

    static get articleActionDownvote(): DebugElement {
      return fixture.debugElement.query(By.css('ul li:nth-child(2) a'));
    }

    static get articleActionDownvoteIcon(): DebugElement {
      return fixture.debugElement.query(By.css('ul li:nth-child(2) i'));
    }

    static get articleActionDownvoteText(): string {
      return fixture.debugElement.query(By.css('ul li:nth-child(2)')).nativeElement.textContent.trim();
    }

    static get articleActionDelete(): DebugElement {
      return fixture.debugElement.query(By.css('ul li:nth-child(3) a'));
    }

    static get articleActionDeleteIcon(): DebugElement {
      return fixture.debugElement.query(By.css('ul li:nth-child(3) i'));
    }

    static get articleActionDeleteText(): string {
      return fixture.debugElement.query(By.css('ul li:nth-child(3)')).nativeElement.textContent.trim();
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

    expect(art.domain).toEqual(`mockurl`);
  });

  it('should not render the article if an article is not present', () => {
    expect(ArticleCmp.votes).toBeFalsy();
  });

  it('should render the article if an article is present', () => {
    component.article = new Article('', '');
    fixture.detectChanges();
    expect(ArticleCmp.votes).toBeTruthy();
  });

  it('should have the right styling applied to the votes element', () => {
    const classes = ArticleCmp.votes.nativeElement.classList;
    const success = ['four', 'wide', 'column', 'center', 'aligned', 'votes'].every(val => classes.contains(val));

    expect(classes.length).toEqual(6);
    expect(success).toBeTruthy();
  });

  it('should render and update the votes value', () => {
    component.article = new Article('', '');
    fixture.detectChanges();

    expect(ArticleCmp.votesValue).toEqual('0');

    component.article = new Article('', '', 5);
    fixture.detectChanges();

    expect(ArticleCmp.votesValue).toEqual('5');
  });

  it('should have a correct votes label text', () => {
    expect(ArticleCmp.votesLabel).toEqual('Points');
  });

  it('should have an article container', () => {
    expect(ArticleCmp.articleContainer).toBeTruthy();
  });

  it('should have an article header', () => {
    expect(ArticleCmp.articleHeader).toBeTruthy();
  });

  it('should have and update it\'s article header label', () => {
    const headers = ['hot', 'fire'];
    component.article = new Article(headers[0], '');
    fixture.detectChanges();

    expect(ArticleCmp.articleHeaderLabel).toEqual(headers[0]);

    component.article = new Article(headers[1], '', 5);
    fixture.detectChanges();

    expect(ArticleCmp.articleHeaderLabel).toEqual(headers[1]);
  });

  it('should have a followable article header link', () => {
    component.article = new Article('', mockLink);
    fixture.detectChanges();

    expect(ArticleCmp.articleHeader.nativeElement.href).toEqual(mockLink);
  });

  it('should have an article meta', () => {
    expect(ArticleCmp.articleMeta).toBeTruthy();
  });

  it('should have and update it\'s article meta label', () => {
    const domains = ['hot', 'fire'];
    component.article.domain = domains[0];
    fixture.detectChanges();

    expect(ArticleCmp.articleMetaLabel).toEqual(`(${domains[0]})`);

    component.article.domain = domains[1];
    fixture.detectChanges();

    expect(ArticleCmp.articleMetaLabel).toEqual(`(${domains[1]})`);
  });

  it('should have article actions list', () => {
    expect(ArticleCmp.articleActionsList).toBeTruthy();
  });

  it('should have the right styling applied to the actions list', () => {
    const classes = ArticleCmp.articleActionsList.nativeElement.classList;
    const success = ['ui', 'big', 'horizontal', 'list', 'voters'].every(val => classes.contains(val));

    expect(classes.length).toEqual(5);
    expect(success).toBeTruthy();
  });

  it('should have upvote action', () => {
    expect(ArticleCmp.articleActionUpvote).toBeTruthy();
  });

  it('should have functional upvote action', () => {
    spyOn(component, 'upvote');
    click(ArticleCmp.articleActionUpvote);

    expect(component.upvote).toHaveBeenCalled();
  });

  it('should have upvote action label text', () => {
    expect(ArticleCmp.articleActionUpvoteText).toEqual('upvote');
  });

  it('should have the right styling applied to the upvote icon', () => {
    const classes = ArticleCmp.articleActionUpvoteIcon.nativeElement.classList;
    const success = ['arrow', 'up', 'icon'].every(val => classes.contains(val));

    expect(classes.length).toEqual(3);
    expect(success).toBeTruthy();
  });

  it('should have downvote action', () => {
    expect(ArticleCmp.articleActionDownvote).toBeTruthy();
  });

  it('should have functional downvote action', () => {
    spyOn(component, 'downvote');
    click(ArticleCmp.articleActionDownvote);

    expect(component.downvote).toHaveBeenCalled();
  });

  it('should have downvote action label text', () => {
    expect(ArticleCmp.articleActionDownvoteText).toEqual('downvote');
  });

  it('should have the right styling applied to the downvote icon', () => {
    const classes = ArticleCmp.articleActionDownvoteIcon.nativeElement.classList;
    const success = ['arrow', 'down', 'icon'].every(val => classes.contains(val));

    expect(classes.length).toEqual(3);
    expect(success).toBeTruthy();
  });

  it('should have delete action', () => {
    expect(ArticleCmp.articleActionDelete).toBeTruthy();
  });

  it('should have functional delete action', () => {
    spyOn(component, 'delete');
    click(ArticleCmp.articleActionDelete);

    expect(component.delete).toHaveBeenCalled();
  });

  it('should have delete action label text', () => {
    expect(ArticleCmp.articleActionDeleteText).toEqual('delete');
  });

  it('should have the right styling applied to the delete icon', () => {
    const classes = ArticleCmp.articleActionDeleteIcon.nativeElement.classList;
    const success = ['delete', 'icon'].every(val => classes.contains(val));

    expect(classes.length).toEqual(2);
    expect(success).toBeTruthy();
  });

  it('should be able to delete an article', () => {
    component.deleted.subscribe(() => {
      expect(true).toBeTruthy();
    });

    component.delete();
    fixture.detectChanges();
  });

});
