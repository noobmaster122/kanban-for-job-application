export interface JobOfferDetails {
    getJobOfferDetails(): Promise<JobOfferDetail>;
  }

  export type JobOfferDetail = {
    positionTitle: string | null;
    hiringManagerName: string | null;
    hiringManagerLinkedIn: string | null;
};
  