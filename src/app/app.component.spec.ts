import { TestBed, TestModuleMetadata, async } from '@angular/core/testing';
import { setUpTestBed } from '../test.common.spec';
import { AppComponent } from './app.component';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { Article } from './article/article.model';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let fixture;
  let app;

  class App {
    static get form(): DebugElement {
      return fixture.debugElement.query(By.css('.ui.header'));
    }

    static get formLabel(): string {
        return App.form.nativeElement.textContent;
    }

    static get formTitle(): DebugElement {
      return fixture.debugElement.query(By.css('form input[name=title]'));
    }

    static get formTitleLabel(): DebugElement {
      return fixture.debugElement.query(By.css('form label[for=title]'));
    }

    static get formTitleLabelText(): string {
      return App.formTitleLabel.nativeElement.textContent;
    }

    static get formLinkLabel(): DebugElement {
      return fixture.debugElement.query(By.css('form label[for=link]'));
    }

    static get formLinkLabelText(): string {
      return App.formLinkLabel.nativeElement.textContent;
    }
}

  setUpTestBed(<TestModuleMetadata>{
    declarations: [ AppComponent ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
  });

  beforeAll(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
  })

  it('should create the app', async(() => {
    expect(app).toBeTruthy();
  }));


  it(`should have articles`, async(() => {
    expect(app.articles).toBeTruthy;
  }));
  
  it('should have some preset articles', async(() => {
    expect(app.articles.length).toBeGreaterThan(0);

    // articles should not be empty
    app.articles.forEach((article: Article) => {
      expect(article.title).toBeDefined();
      expect(article.link).toBeDefined();
      expect(article.votes).toBeDefined();
    });
  }));

  it('should be able to add articles', async(() => {
    const mockTitle = 'MockName';
    const mockLink = 'http://mock.url/';
    const titleEl = <HTMLInputElement> {value: mockTitle};
    const linkEl = <HTMLInputElement> {value: mockLink};
    const mockEl = new Article(mockTitle, mockLink);

    const mockArticlePresent = (): boolean => app.articles.includes(mockEl);

    // element should not be present in the articles array beforehand
    expect(mockArticlePresent()).toBeFalsy;
    app.addArticle(titleEl, linkEl);
    
    // element should be added to the articles array
    expect(mockArticlePresent()).toBeFalsy;
  }));

  it('should be able to sort articles by votes', async(() => {
    app.articles = <Array<Article>>[{votes:3}, {votes:5}, {votes:7}];
  
    const articlesVotes = (input: Array<Article>): Array<number> => input.map(article => article.votes);

    // elements should not be sorted by default
    expect(articlesVotes(app.articles)).toEqual([3, 5, 7]);
    const sorted = app.sortedArticles();
    // articles should be sorted by vote
    expect(articlesVotes(sorted)).toEqual([7,5,3]);  
  }));

  describe('input form', (() => {
    it('should be created', async(() => {
      expect(App.form).toBeTruthy();
    }));
  
    it('should have a form title', async(() => {
      expect(App.formLabel).toEqual('Add an Article');
    }));

    it('should have a title input label', async(() => {
      expect(App.formTitleLabel).toBeTruthy();
    }));

    it('should have a title input label text', async(() => {
      expect(App.formTitleLabelText).toEqual('Title:');
    }));

    it('should have a link input label', async(() => {
      expect(App.formLinkLabel).toBeTruthy();
    }));

    it('should have a link input label text', async(() => {
      expect(App.formLinkLabelText).toEqual('Link:');
    }));
  }));

  
});
