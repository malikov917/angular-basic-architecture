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
    const todos = this.todoState.getTodos();
    this.todoState.setTodos(
      [...todos, todo]
    );
  }

  deleteTodo(todo: Todo) {
    const todos = this.todoState.getTodos();
    this.todoState.setTodos(
      [...todos.filter(x => x !== todo)]
    );
  }

  toggleTodo(todo: Todo) {
    const todos = this.todoState.getTodos();
    todo = todos.find(x => x.description === todo.description);
    todo.done = !todo.done;
    this.todoState.setTodos(
      [...todos]
    );
  }

  toggleAllTodos() {
    const todos = this.todoState.getTodos();
    const allDone = todos.every(todo => todo.done);
    todos.forEach(todo => todo.done = !allDone);
    this.todoState.setTodos(
      [...todos]
    );
  }

  deleteAllTodos() {
    this.todoState.setTodos([]);
  }

  filterTodos(value: string) {
    this.todoState.setFilter(value);
  };
}
