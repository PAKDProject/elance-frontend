import { browser, by, element, $$ } from 'protractor';
import { elementStart } from '@angular/core/src/render3/instructions';

export class AppPage {
  navigateTo(route: string) {
    return browser.get(route);
  }

  navigateToDashboard() {
    return browser.get('/user-dashboard');
  }

  getUserDashboardText() {
    return element(by.css('h2')).getText();
  }

  getParagraphText() {
    return element(by.css('.jobTitleContainer h2')).getText();
  }
  getButtons() {
    return $$('form button');
  }
}
