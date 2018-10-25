import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display software developer', () => {
    page.navigateTo('/user-profile');
    expect(page.getParagraphText()).toEqual('Software Developer');
  });

  it('should display user-dashboard', () => {
    page.navigateTo('/user-dashboard');
    expect(page.getUserDashboardText()).toEqual('Dashboard');
  });

  it('Should display 4 buttons', () => {
    page.navigateTo('/user/create');
    expect(page.getButtons().count()).toEqual(4);
  });
});
