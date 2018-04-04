import { AppPage } from './app.po';
import { by } from 'protractor';

describe('target App', () => {
  let page: AppPage;
  const mockTitle = 'MockTitle';
  const mockLink = 'MockLink';

  const getVotes = async(article) => +(await article.element(by.css('.votes .value')).getText());

  beforeEach(() => {
    page = new AppPage();
    page.navigateTo();
  });
  
  it('should have an app entry point', () => {
    expect(page.getApp()).toBeTruthy();
  });

  // Header
  it('should have a header', () => {
    expect(page.getHeader()).toBeTruthy();
  });

  it('should have a propper header message', () => {
    expect(page.getHeaderText()).toEqual('Angular Simple Reddit');
  });

  // Article Form
  describe('when adding an article', () => {
    let prevArticleCount;
    beforeEach(() => {
      prevArticleCount = page.getArticlesCount();
      page.getArticleFormTitle().sendKeys(mockTitle);
      page.getArticleFormLink().sendKeys(mockLink);
      page.getArticleFormSubmitButton().click();  
    });

    it('should be able to add a new article', () => {
      expect(page.getArticlesCount()).toBeGreaterThan(prevArticleCount);
      const addedArticle = page.getArticles().last().element(by.css('.header'));
  
      expect(addedArticle.getText()).toEqual(mockTitle);
      expect(addedArticle.getAttribute('href')).toContain(mockLink);
    });
  
    it('should clear form imput fiels after an article was added', () => {
      expect(page.getArticleFormTitle().getText()).toEqual('');
      expect(page.getArticleFormLink().getText()).toEqual('');
    });
  });

  it('should be able to upvote an article', () => {
    const article = page.getArticles().first();
    const upvote = article.element(by.css('ul li:nth-child(1) a'));
    const previousVotes = getVotes(article);

    upvote.click();
    expect(getVotes(article)).toBeGreaterThan(previousVotes);
  });

  it('should be able to downvote an article', () => {
    const article = page.getArticles().first();
    const downvote = article.element(by.css('ul li:nth-child(2) a'));
    const previousVotes = getVotes(article);

    downvote.click();
    expect(getVotes(article)).toBeLessThan(previousVotes);
  });

  it('should be able to delete an article', () => {
    const article = page.getArticles().first();
    const del = article.element(by.css('ul li:nth-child(3) a'));
    const articleHeader = () => article.element(by.css('.votes .value'));

    const previousheader = articleHeader();

    del.click();
    expect(articleHeader).not.toEqual(previousheader);
  });

});
