import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { KanbanComponent } from './components/kanban/kanban.component'; // Adjust the import path
import { DialogModule } from '@syncfusion/ej2-angular-popups'; // Import Syncfusion Dialog Module
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA] 
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); 
  });

  it('should create the app component', () => {
    expect(component).toBeTruthy();
  });

});
