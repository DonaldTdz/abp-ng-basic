import { AbpBasicTemplatePage } from './app.po';

describe('AbpBasic App', function() {
  let page: AbpBasicTemplatePage;

  beforeEach(() => {
    page = new AbpBasicTemplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
