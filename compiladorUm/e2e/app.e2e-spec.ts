import { CompiladorUmPage } from './app.po';

describe('compilador-um App', function() {
  let page: CompiladorUmPage;

  beforeEach(() => {
    page = new CompiladorUmPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
