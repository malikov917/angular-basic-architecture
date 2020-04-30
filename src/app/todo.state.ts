import {BehaviorSubject, Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {SuperBehaviourSubject, SuperBehaviourSubjectNext} from './super-behaviour-subject';

export interface Todo {
  description: string;
  done: boolean;
}

export interface TodoStateModel {
  todos: Todo[]
}

const sampleTodos: Todo[] = [
  { description: 'first todo', done: true },
  { description: 'second todo', done: true },
  { description: 'third todo', done: false },
  { description: 'fourth todo', done: false },
  { description: 'fifth todo', done: false },
];

@Injectable({"providedIn": "root"})
export class TodoState {

  private readonly todos$ = new SuperBehaviourSubject<Todo[]>(sampleTodos);
  private readonly filter$ = new BehaviorSubject<string>('');
  private readonly updating$ = new BehaviorSubject<boolean>(false);

  getTodos$(): Observable<Todo[]> {
    return this.todos$.asObservable();
  }

  getFilter$(): Observable<string> {
    return this.filter$.asObservable();
  }

  isUpdating$(): Observable<boolean> {
    return this.updating$.asObservable();
  }

  setTodos(todos: SuperBehaviourSubjectNext<Todo[]>): void {
    this.todos$.next(todos);
  }

  setFilter(value: string): void {
    this.filter$.next(value);
  }

  setUpdating(isUpdating: boolean) {
    this.updating$.next(isUpdating);
  }
}
