import { Injectable } from '@angular/core';
import { JobOfferDetails, JobOfferDetail } from '../../models/jobOfferDetails.model';
import { ChromeConnectionService } from "../chrome-connection/chrome-connection.service";

@Injectable({
  providedIn: 'root'
})
export class JobOfferDetailsImplService implements JobOfferDetails {

  constructor(private chromeConnectionService: ChromeConnectionService) { }

  async getJobOfferDetails(): Promise<JobOfferDetail> {

    const documentObj = await this.chromeConnectionService.getDocumentObj();
    if (!documentObj) throw new Error("Failed to retrieve the document");

    return {
      positionTitle: this.getPositionTitle(documentObj),
      hiringManagerName: this.getHiringManagerName(documentObj),
      hiringManagerLinkedIn: this.getHiringManagerLinkedin(documentObj)
    };
  };

  private getElement(document: Document, refs: Array<string>): Element | HTMLAnchorElement | null {
    for (const ref of refs) {
      const element = document.querySelector(ref);
      if (element) {
        return element;
      }
    }
    return null;
  }

  private getCompanyName(document: Document): string | null {
    const htmlElementsTags: Array<string> = [".job-details-jobs-unified-top-card__company-name a"];
    return this.getElement(document, htmlElementsTags)?.textContent ?? null;
  }
  private getPositionTitle(document: Document): string | null {
    const htmlElementsTags: Array<string> = [".job-details-jobs-unified-top-card__job-title a"];
    return this.getElement(document, htmlElementsTags)?.textContent ?? null;
  }
  private getHiringManagerName(document: Document): string | null {
    const htmlElementsTags: Array<string> = [".hirer-card__hirer-information span strong"];
    return this.getElement(document, htmlElementsTags)?.textContent ?? null;
  }
  private getHiringManagerLinkedin(document: Document): string | null {
    const htmlElementsTags: Array<string> = [".hirer-card__hirer-information a"];
    const retrievedEle : unknown = this.getElement(document, htmlElementsTags);
    if(retrievedEle && retrievedEle instanceof HTMLAnchorElement){
      return retrievedEle.href;
    }
    
    return null;
  }

}
