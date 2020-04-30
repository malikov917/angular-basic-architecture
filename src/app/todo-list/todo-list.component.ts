import { Component, ChangeDetectionStrategy } from '@angular/core';
import {TodoFacade} from "../todo.facade";
import {Todo} from "../todo.state";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent {

  uncheckedTodos$ = this.todoFacade.getUncheckedTodos$();
  todos$ = this.todoFacade.getTodos$();

  constructor(private todoFacade: TodoFacade) { }

  toggleTodo(todo: Todo): void {
    this.todoFacade.toggleTodo(todo);
  }

  deleteTodo(todo: Todo): void {
    this.todoFacade.deleteTodo(todo);
  }

  checkAll(): void {
    this.todoFacade.toggleAllTodos();
  }

  deleteChecked(): void {
    this.todoFacade.deleteAllTodos();
  }

  filterTodos(value: string): void {
    this.todoFacade.filterTodos(value);
  }

}
