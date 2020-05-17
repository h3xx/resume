import {
    browser,
    by,
    element,
} from 'protractor';

export class AppPage {

    public async navigateTo(): Promise<unknown> {
        return browser.get(browser.baseUrl) as Promise<unknown>;
    } // end navigateTo()

    public async getTitleText(): Promise<string> {
        return element(by.css('app-root .content span')).getText() as Promise<string>;
    } // end getTitleText()

}
