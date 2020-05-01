import {Injectable} from "@angular/core";
import {Todo, TodoState, TodoStateModel} from "./todo.state";
import {combineLatest, Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({ "providedIn": "root" })
export class TodoFacade {

  constructor(private todoState: TodoState) { }

  getTodos$(): Observable<Todo[]> {
    return combineLatest([this.todoState.getTodos$(), this.todoState.getFilter$()])
      .pipe(
        map(([todos, value]) => {
            return !Boolean(value)
              ? todos
              : todos.filter(todo => todo.description.includes(value))
          }
        )
      );
  }

  getUncheckedTodos$(): Observable<Todo[]> {
    return this.todoState.getTodos$()
      .pipe(
        map((todos: Todo[]) =>
          todos.filter((todo: Todo) => todo.done)
        )
      );
  }

  createTodo(description: string) {
    const todo = { description: description, done: false };
    this.todoState.setTodos((todos) => [...todos, todo]);
  }

  deleteTodo(todo: Todo) {
    this.todoState.setTodos((todos) => [...todos.filter(x => x !== todo)]);
  }

  toggleTodo(todo: Todo) {
    this.todoState.setTodos((todos) => todos.map(todoItem => {
        if (todoItem.description === todo.description) {
          todoItem.done = !todoItem.done;
        }
        return todoItem;
      })
    );
  }

  toggleAllTodos() {
    this.todoState.setTodos((todos) => {
      const isAllDone = todos.every(todo => todo.done);
      return todos.map(todo => {
        todo.done = !isAllDone;
        return todo;
      });
    });
  }

  deleteAllTodos() {
    this.todoState.setTodos([]);
  }

  filterTodos(value: string) {
    this.todoState.setFilter(value);
  }
}
