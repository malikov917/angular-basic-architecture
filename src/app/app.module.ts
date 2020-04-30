import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TodoFormComponent } from './todo-form/todo-form.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { ToolbarComponent } from './todo-list/toolbar/toolbar.component';

@NgModule({
  imports:      [
    BrowserModule,
    ReactiveFormsModule,
    ],
  declarations: [ AppComponent, TodoFormComponent, TodoListComponent, ToolbarComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
