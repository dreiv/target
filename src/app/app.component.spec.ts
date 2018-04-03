import { TestBed, TestModuleMetadata, async, ComponentFixture } from '@angular/core/testing';
import { setUpTestBed } from '../test.common.spec';
import { AppComponent } from './app.component';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { Article } from './article/article.model';
import { By } from '@angular/platform-browser';
import { click } from './utils';

describe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  class App {
    static get form(): DebugElement {
      return fixture.debugElement.query(By.css('form'));
    }

    static get formHeader(): DebugElement {
      return fixture.debugElement.query(By.css('form .header'));
    }

    static get formHeaderText(): string {
        return App.formHeader.nativeElement.textContent;
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

    static get formLink(): DebugElement {
      return fixture.debugElement.query(By.css('form input[name=link]'));
    }

    static get formLinkLabel(): DebugElement {
      return fixture.debugElement.query(By.css('form label[for=link]'));
    }

    static get formLinkLabelText(): string {
      return App.formLinkLabel.nativeElement.textContent;
    }

    static get formSubmitButton(): DebugElement {
      return fixture.debugElement.query(By.css('form button'));
    }

    static get formSubmitButtonText(): string {
      return App.formSubmitButton.nativeElement.textContent;
    }

    static get horizontalRuleAfterForm(): DebugElement {
      return fixture.debugElement.query(By.css('form + hr'));
    }

    static get posts(): DebugElement {
      return fixture.debugElement.query(By.css('.posts'));
    }
  }

  setUpTestBed(<TestModuleMetadata>{
    declarations: [ AppComponent ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
  });

  beforeAll(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });


  it(`should have articles`, () => {
    expect(app.articles).toBeTruthy();
  });

  it('should have some preset articles', () => {
    expect(app.articles.length).toBeGreaterThan(0);

    // articles should not be empty
    const success = app.articles.every(art => Object.values(art).every(val => val != null));
    expect(success).toBeTruthy();
  });

  it('should be able to add articles', () => {
    const mockTitle = 'MockName';
    const mockLink = 'http://mock.url/';
    const mockArticlePresent = () => app.articles.some(art => art.title === mockTitle && art.link === mockLink);

    // element should not be present in the articles array beforehand
    expect(mockArticlePresent()).toBeFalsy();
    app.addArticle(<HTMLInputElement>{ value: mockTitle }, <HTMLInputElement> {value: mockLink});

    // element should be added to the articles array
    expect(mockArticlePresent()).toBeTruthy();
  });

  it('should be able to sort articles by votes', () => {
    app.articles = <Array<Article>>[{votes: 3}, {votes: 5}, {votes: 7}];

    const articlesVotes = articles => articles.map(art => art.votes);

    // elements should not be sorted by default
    expect(articlesVotes(app.articles)).toEqual([3, 5, 7]);
    const sorted = app.sortedArticles();
    // articles should be sorted by vote
    expect(articlesVotes(sorted)).toEqual([7, 5, 3]);
  });

  describe('input form', (() => {
    it('should be created', () => {
      expect(App.form).toBeTruthy();
    });

    it('should have the right styling applied to the form', () => {
      const classes = App.form.nativeElement.classList;
      const success = ['ui', 'large', 'form', 'segment'].every(val => classes.contains(val));

      expect(classes.length).toEqual(4);
      expect(success).toBeTruthy();
    });

    it('should have a form header', () => {
      expect(App.formHeader).toBeTruthy();
    });

    it('should have a form header text', () => {
      expect(App.formHeaderText).toEqual('Add an Article');
    });

    it('should have the right styling applied to the form header', () => {
      const classes = App.formHeader.nativeElement.classList;
      const success = ['ui', 'header'].every(val => classes.contains(val));

      expect(classes.length).toEqual(2);
      expect(success).toBeTruthy();
    });

    it('should have a label for the title input', () => {
      expect(App.formTitleLabel).toBeTruthy();
    });

    it('should have a label text for the title input', () => {
      expect(App.formTitleLabelText).toEqual('Title:');
    });

    it('should have a title input', () => {
      expect(App.formTitle).toBeTruthy();
    });

    it('should have an empty title input value', () => {
      expect(App.formTitle.nativeElement.value).toEqual('');
    });

    it('should have a label for the link input', () => {
      expect(App.formLinkLabel).toBeTruthy();
    });

    it('should have a label text for the link input', () => {
      expect(App.formLinkLabelText).toEqual('Link:');
    });

    it('should have a link input', () => {
      expect(App.formLink).toBeTruthy();
    });

    it('should have an empty link input value', () => {
      expect(App.formLink.nativeElement.value).toEqual('');
    });

    it('should have a submit button', () => {
      expect(App.formSubmitButton).toBeTruthy();
    });

    it('should have a submit button label text', () => {
      expect(App.formSubmitButtonText).toContain('Submit article');
    });

    it('should have the right styling applied to the button', () => {
      const classes = App.formSubmitButton.nativeElement.classList;
      const success = ['ui', 'positive', 'right', 'floated', 'button'].every(val => classes.contains(val));

      expect(classes.length).toEqual(5);
      expect(success).toBeTruthy();
    });

    it('should call #addArticle() when submit button is called', () => {
      spyOn(app, 'addArticle');
      click(App.formSubmitButton);
      expect(app.addArticle).toHaveBeenCalledWith(App.formTitle.nativeElement, App.formLink.nativeElement);
    });
  }));

  it('should have a separator between the form and the posts', () => {
      expect(App.horizontalRuleAfterForm).toBeTruthy();
  });

  it('should have posts section', () => {
    expect(App.posts).toBeTruthy();
  });
});
