import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { KanbanComponent } from './kanban.component';
import { JobOfferDetailsImplService } from '../../services/job-offer-extraction/job-offer-details-impl.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { columns, cardSettings, data, dialogSettings } from './data';

describe('KanbanComponent', () => {
  let component: KanbanComponent;
  let fixture: ComponentFixture<KanbanComponent>;
  let de: DebugElement;
  let jobOfferDetailsImplServiceSpy: jasmine.SpyObj<JobOfferDetailsImplService>;

  beforeEach(async () => {
    const jobOfferDetailsSpy = jasmine.createSpyObj('JobOfferDetailsImplService', ['getJobOfferDetails']);

    await TestBed.configureTestingModule({
      declarations: [KanbanComponent],
      providers: [{ provide: JobOfferDetailsImplService, useValue: jobOfferDetailsSpy }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    jobOfferDetailsImplServiceSpy = TestBed.inject(JobOfferDetailsImplService) as jasmine.SpyObj<JobOfferDetailsImplService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KanbanComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;

    component.columns = columns;
    component.data = data;
    component.cardSettings = cardSettings;
    component.dialogSettings = dialogSettings;

    // mock customKanban for testing dataStateChange and other methods that reference it
    component.customKanban = {
      kanbanData: data,
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should save kanban data to localStorage on dataStateChange', () => {
    const localStorageSpy = spyOn(localStorage, 'setItem');
    component.dataStateChange({});
    expect(localStorageSpy).toHaveBeenCalledWith('initialDataStore', JSON.stringify(component.customKanban.kanbanData));
  });
});
