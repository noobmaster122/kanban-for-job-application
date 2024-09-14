import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { KanbanComponent } from './kanban.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { getLocalStorageValuesByPattern, columns, cardSettings, data, dialogSettings } from './data'; 

describe('KanbanComponent', () => {
  let component: KanbanComponent;
  let fixture: ComponentFixture<KanbanComponent>;
  let de: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KanbanComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA] 
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KanbanComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;

    component.columns = columns;
    component.data = getLocalStorageValuesByPattern('^kanbankanban', data);
    component.cardSettings = cardSettings;
    component.dialogSettings = dialogSettings;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply font size to card headers', () => {
    const cardsHeaders = de.queryAll(By.css('.e-header-text'));
    cardsHeaders.forEach((element) => {
      expect((element.nativeElement as HTMLElement).style.fontSize).toBe('12px');
    });
  });

  it('should update empty cards content', () => {
    const emptyCards = de.queryAll(By.css('.e-empty-card'));
    emptyCards.forEach((element) => {
      expect((element.nativeElement as HTMLElement).innerHTML).toContain('Rien à montrer 😔');
      expect((element.nativeElement as HTMLElement).parentElement?.style.textAlign).toBe('center');
    });
  });

  it('should save kanban data to localStorage on dataStateChange', () => {
    const localStorageSpy = spyOn(localStorage, 'setItem');
    component.dataStateChange({});
    expect(localStorageSpy).toHaveBeenCalledWith('initialDataStore', JSON.stringify(component.customKanban.kanbanData));
  });

});
