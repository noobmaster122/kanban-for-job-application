import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChromeConnectionService {
  private port!: chrome.runtime.Port;
  private readonly CHROME_CONNECTION : string = "angularConnection";
  private readonly PORT_EVENT : string = "getCurrentHTML";

  constructor() {
    this.port = chrome.runtime.connect({ name: this.CHROME_CONNECTION });
  }

  private processHTML(htmlString: string): Document {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    return doc;
  }

  private requestHTMLContent(): void {
    this.port.postMessage({ request: this.PORT_EVENT });
  }

  //use this to get doc object of current tab
  public getDocumentObj(): Promise<Document | null> {
    this.requestHTMLContent();//trigger doc retrieval

    return new Promise((resolve) => {
      this.port.onMessage.addListener((message: any) => {
        const result = message.html ? this.processHTML(message.html) : null;
        resolve(result);
      });
    });
  }
  public getCurrentOpenTabLink(): Promise<string | null> {
    this.requestHTMLContent();//trigger doc retrieval

    return new Promise((resolve) => {
      this.port.onMessage.addListener((message: any) => {
        resolve(message.url ?? null);
      });
    });
  }

  //use this func for custom callbacks
  public onMessage(callback: (message: any) => void): void {
    this.port.onMessage.addListener(callback);
  }
}
