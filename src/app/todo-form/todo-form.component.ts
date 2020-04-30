import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {TodoFacade} from "../todo.facade";

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoFormComponent {

  todoForm: FormGroup;

  constructor(private fb: FormBuilder,
              private todoFacade: TodoFacade) {
    this.todoForm = fb.group({
      description: null
    });

  }

  submitTodo(): void {
    const { description } = this.todoForm.value;
    this.todoForm.patchValue({ description: null });
    this.todoFacade.createTodo(description);
  }

}
