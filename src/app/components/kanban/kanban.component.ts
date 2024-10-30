/// <reference types="chrome" />
import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CardSettingsModel, ColumnsModel, DataSourceChangedEventArgs, DataStateChangeEventArgs, DialogCloseEventArgs, DialogEventArgs, DialogSettingsModel } from '@syncfusion/ej2-angular-kanban';
import { Card } from 'src/app/models/card.model';
import {  columns, cardSettings, data, dialogSettings, getStoredOrInitialCardsStore } from './data';
import {JobOfferDetailsImplService} from "../../services/job-offer-extraction/job-offer-details-impl.service";
import {JobOfferDetail} from '../../models/jobOfferDetails.model';

@Component({
  selector: 'app-kanban',
  styleUrls: ['./kanban.component.css'],
  template: `
  <ejs-kanban #customKanban class='kanban-custom' height="400" width="100%" [dataSource]='data' [dialogSettings]='dialogSettings' [columns]='columns' keyField="status" [cardSettings]='cardSettings' (dataStateChange)= 'dataStateChange($event)' (dataSourceChanged)="dataSourceHandler($event)" (dialogOpen)="dialogOpen($event)"  enableTooltip='true'>         
    <ng-template #cardSettingsTemplate let-data> 
      <div class="card-template e-tooltip-text"> 
        <span>{{ data.positionTitle | truncate:8 }}</span>
        <span  [ngClass]="{'avatar-contacted': data.haveContactedHiringManager, 'avatar-not-contacted': !data.haveContactedHiringManager}"
        class="avatar"><a [href]="data.hiringManagerLinkedIn" target="_blank">🧑</a></span>
      </div> 
    </ng-template> 
    <ng-template #tooltipTemplate let-data>
        <div class='e-kanbanTooltipTemp '>
          <span>Poste: {{data.positionTitle}}</span><br>
          <span>Manager: {{data.hiringManagerName}}</span><br>
       </div>
    </ng-template>
  </ejs-kanban>
  `
})
export class KanbanComponent implements AfterViewChecked, AfterViewInit {
  @ViewChild('customKanban') customKanban!: any;

  public columns: ColumnsModel[];
  public data: Card[];
  public cardSettings: CardSettingsModel;
  public dialogSettings: DialogSettingsModel;


  constructor(private jobOfferDetailsImplService: JobOfferDetailsImplService) {

    this.columns = columns;
    this.cardSettings = cardSettings;

    this.data = getStoredOrInitialCardsStore(data);
    this.dialogSettings = dialogSettings;
  }

  ngAfterViewInit(): void {
    console.log("component and children should load", this);
  }

  ngAfterViewChecked(): void {
    const emptyCards = document.querySelectorAll('.e-empty-card');
    const cardsHeaders = document.querySelectorAll('.e-header-text');

    cardsHeaders.forEach((element) => {
      (element as HTMLElement).style.fontSize = '12px';

    });

    emptyCards.forEach((element) => {
      (element as HTMLElement).innerHTML = 'Rien à montrer 😔';
      const parentEl = (element as HTMLElement).parentElement;
      (parentEl as HTMLElement).style.textAlign = 'center';

    });
  }

  dataStateChange(state:any){
    localStorage.setItem('initialDataStore', JSON.stringify(this.customKanban.kanbanData));
    console.log(this.data);
  }

  dataSourceHandler(state:any){
      state.endEdit();
  }

  async dialogOpen(args: DialogEventArgs) {

    const jobOfferDetails: JobOfferDetail = await this.jobOfferDetailsImplService.getJobOfferDetails();
    
    const dialogEle = args.element;
    if (dialogEle) {
      const dialogInputs = dialogEle.querySelectorAll('input, textarea'); 

      dialogInputs.forEach((input) => {
        const htmlInput = input as HTMLInputElement; 

        if (htmlInput.name === 'positionTitle') {
          htmlInput.value = jobOfferDetails.positionTitle ?? ''; 
        } else if (htmlInput.name === 'hiringManagerName') {
          htmlInput.value = jobOfferDetails.hiringManagerName ?? ''; 
        } else if (htmlInput.name === 'hiringManagerLinkedIn') {
          htmlInput.value = jobOfferDetails.hiringManagerLinkedIn ?? '#'; 
        }
      });
    }
  }
}
