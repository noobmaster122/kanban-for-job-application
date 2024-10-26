/// <reference types="chrome" />
import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CardSettingsModel, ColumnsModel, DataSourceChangedEventArgs, DataStateChangeEventArgs, DialogCloseEventArgs, DialogEventArgs, DialogSettingsModel } from '@syncfusion/ej2-angular-kanban';
import { Card } from 'src/app/models/card.model';
import {  columns, cardSettings, data, dialogSettings, getStoredOrInitialCardsStore } from './data';
import { ChromeConnectionService } from 'src/app/services/chrome-connection/chrome-connection.service';


@Component({
  selector: 'app-kanban',
  styleUrls: ['./kanban.component.css'],
  template: `
  <ejs-kanban #customKanban class='kanban-custom' height="400" width="100%" [dataSource]='data' enablePersistence='true' [dialogSettings]='dialogSettings' [columns]='columns' keyField="status" [cardSettings]='cardSettings' (dataStateChange)= 'dataStateChange($event)' (dataSourceChanged)="dataSourceHandler($event)"  enableTooltip='true'>         
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
export class KanbanComponent implements OnInit, AfterViewChecked, AfterViewInit {
  @ViewChild('modal') modal!: KanbanComponent;
  @ViewChild('customKanban') customKanban!: any;

  public columns: ColumnsModel[];
  public data: Card[];
  public cardSettings: CardSettingsModel;
  public dialogSettings: DialogSettingsModel;


  constructor(private chromeConnectionService : ChromeConnectionService) {

    this.columns = columns;
    this.cardSettings = cardSettings;

    this.data = getStoredOrInitialCardsStore(data);
    this.dialogSettings = dialogSettings;
  }

  ngOnInit(): void {
    this.chromeConnectionService.getDocumentObj()
    .then((res:Document | null) => console.log("am html content", res))
    .catch((err:any) => console.error(err));

    this.chromeConnectionService.getCurrentOpenTabLink()
    .then((res:string | null) => console.log("am html url", res))
    .catch((err:any) => console.error(err));
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

}
