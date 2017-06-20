import { GenginePage } from './app.po';

describe('gengine App', () => {
  let page: GenginePage;

  beforeEach(() => {
    page = new GenginePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
