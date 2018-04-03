import { browser, by, element, WebElement } from 'protractor';

export class AppPage {
  header = (selector = '') => `.menu ${selector}.header`;

  navigateTo() {
    return browser.get('/');
  }

  getHeader(): WebElement {
    return element(by.css(this.header()));
  }

  getHeaderText() {
    return element(by.css(this.header('h1'))).getText();
  }

  getApp(): WebElement {
    return element(by.css('app-root'));
  }

}
