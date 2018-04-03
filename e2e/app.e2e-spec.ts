import { AppPage } from './app.po';

describe('target App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateTo();
  });

  it('should have a header', () => {
    expect(page.getHeader()).toBeTruthy();
  });

  it('should have a propper header message', () => {
    expect(page.getHeaderText()).toEqual('Angular Simple Reddit');
  });

  it('should have an app entry point', () => {
    expect(page.getApp()).toBeTruthy();
  });

});
