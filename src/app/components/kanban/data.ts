import { CardSettingsModel, ColumnsModel, DialogSettingsModel } from "@syncfusion/ej2-angular-kanban";
import { Card } from "../../models/card.model";


export function getLocalStorageItemFromReg(regex:RegExp):string|null{
    for (let i = 0; i < localStorage.length; i++) {
        const key:string|null = localStorage.key(i);
    
        if (!!key && regex.test(key)) {
          const value = localStorage.getItem(key);
    
          return value;
        }
      }
      return null;  
}
export function getStoredOrInitialCardsStore(data: Card[]): Card[]
 {

    const DEFAULT_STORE : string = "initialDataStore";

    //kanban datastore not found
    // const kanbanDataStoreOrNull = getLocalStorageItemFromReg(new RegExp(pattern));
    // if(kanbanDataStoreOrNull){
    //     const kanbanState = JSON.parse(kanbanDataStoreOrNull);
    //     return kanbanState.dataSource;
    // }

    //kanban datastore not found but initial datastore is
    const initialDataStoreOrNull = getLocalStorageItemFromReg(new RegExp(DEFAULT_STORE));
    if(initialDataStoreOrNull){
        return JSON.parse(initialDataStoreOrNull);
    }

    localStorage.setItem(DEFAULT_STORE, JSON.stringify(data));

    return data;

  }

export const data: Card[] = [
    {
        Id: 432,
        status: 'toApplyStatus',
        positionTitle: "Développeur java",
        hiringManagerName: "John doe",
        hiringManagerLinkedIn: "#",
        haveContactedHiringManager: false,
    }
];

export const dialogSettings: DialogSettingsModel = {
    fields: [
        { key: 'status', type: 'DropDown', text:'Status' },
        { key: 'positionTitle', type: 'TextBox', text: 'Title' },
        { key: 'hiringManagerName', type: 'TextBox', text:'Company' },
        { key: 'hiringManagerLinkedIn', type: 'TextBox', text: 'Link' },
        { key: 'haveContactedHiringManager', type: 'TextBox', text: 'Contacted ?' },
    ]
};

// Define the columns
export const columns: ColumnsModel[] = [
    {
        headerText: 'To Apply',
        keyField: 'toApplyStatus',
        showAddButton: true,
        showItemCount: false,
        // template: `<div class="header-template-wrap">
        //            <div class="header-text">To apply</div>
        //            <div class="open-dialog-trigger" data-key="toApplyStatus">open</div>
        //          </div>`,

        allowToggle: true,
    },
    {
        headerText: 'Applied',
        keyField: 'appliedStatus',
        showAddButton: true,
        showItemCount: false,

    //     template: `<div class="header-template-wrap">
    //     <div class="header-text">Applied</div>
    //                <div class="open-dialog-trigger" data-key="appliedStatus">open</div>
    //   </div>`,
        allowToggle: true,
    },
    {
        headerText: 'HR Interview',
        keyField: 'doneStatus',
        showAddButton: true,
        showItemCount: false,

    //     template: `<div class="header-template-wrap">
    //     <div class="header-text">HR Interview</div>
    //                <div class="open-dialog-trigger" data-key="doneStatus">open</div>
    //   </div>`,
        allowToggle: true,
    },
    {
        headerText: 'Boss fight',
        keyField: 'bossFightStatus',
        showAddButton: true,
        showItemCount: false,

    //     template: `<div class="header-template-wrap">
    //     <div class="header-text">Boss fight</div>
    //                <div class="open-dialog-trigger" data-key="bossFightStatus">open</div>
    //   </div>`,
        allowToggle: true,
    },
    {
        headerText: 'Happiness',
        keyField: 'vacationStatus',
        showAddButton: true,
        showItemCount: false,

    //     template: `<div class="header-template-wrap">
    //     <div class="header-text">Viva la vida</div>
    //                <div class="open-dialog-trigger" data-key="vacationStatus">open</div>
    //   </div>`,
        allowToggle: true,
    }
];
export const cardSettings: CardSettingsModel = {
    headerField: 'Id',
    contentField: 'Summary',
};
