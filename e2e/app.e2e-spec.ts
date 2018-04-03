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

  it('should display welcome message', () => {
    expect(page.getParagraphText()).toEqual('Angular Simple Reddit');
  });
});
