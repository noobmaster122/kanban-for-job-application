export interface Card {
    Id: number;
    status: "toApplyStatus" | "appliedStatus" | "doneStatus" | "bossFightStatus" | "vacationStatus";
    positionTitle: string;
    hiringManagerName: string;
    hiringManagerLinkedIn: string;
    haveContactedHiringManager: boolean;
  }