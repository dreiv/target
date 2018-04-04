import { browser, by, element, ElementFinder, ElementArrayFinder } from 'protractor';

export class AppPage {
  header = (selector = '') => `.menu ${selector}.header`;

  navigateTo() {
    return browser.get('/');
  }

  getHeader(): ElementFinder {
    return element(by.css(this.header()));
  }

  getHeaderText() {
    return element(by.css(this.header('h1'))).getText();
  }

  getApp(): ElementFinder {
    return element(by.css('app-root'));
  }

  getArticleFormTitle(): ElementFinder {
    return element(by.css('form input[name=title]'));
  }

  getArticleFormLink(): ElementFinder {
    return element(by.css('form input[name=link]'));
  }

  getArticleFormSubmitButton(): ElementFinder {
    return element(by.css('form button'));
  }

  getArticles(): ElementArrayFinder {
    return element.all(by.css('app-article'));
  }

  async getArticlesCount() {
    return await this.getArticles().count();
  }
}
