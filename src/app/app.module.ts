import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { KanbanComponent } from './components/kanban/kanban.component';
import { KanbanModule } from '@syncfusion/ej2-angular-kanban';
import { FormsModule } from '@angular/forms';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { TruncatePipe } from './pipes/truncate/truncate.pipe';

@NgModule({
  declarations: [
    AppComponent,
    KanbanComponent,
    TruncatePipe
  ],
  imports: [
    BrowserModule,
    KanbanModule,
    FormsModule,
    DialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
