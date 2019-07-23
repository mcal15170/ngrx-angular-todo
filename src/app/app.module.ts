import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { FormsModule } from '@angular/forms';
import { todoReducer } from './store/reducers/todo.reducer';
import { TodoListComponent } from './pages/todo-list/todo-list.component';
import { TodoOverviewComponent } from './pages/todo-overview/todo-overview.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { SelectService } from './pages/select.service';
import {MatRadioModule} from '@angular/material/radio';
import { HttpClientModule } from '@angular/common/http';
import {MatToolbarModule} from '@angular/material/toolbar';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoOverviewComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatMenuModule,
    FormsModule,
    MatIconModule,
    MatCheckboxModule,
    MatRadioModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatToolbarModule,
    HttpClientModule,
    StoreModule.forRoot({
      todo: todoReducer
    }),

    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),

  ],
  providers: [SelectService],
  bootstrap: [AppComponent]
})
export class AppModule { }
