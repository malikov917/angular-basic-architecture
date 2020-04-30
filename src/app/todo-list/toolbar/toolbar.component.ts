import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { TodoFacade } from "../../todo.facade";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent {
  @Input() uncheckedTodos = 0;
  @Output() checkAll = new EventEmitter<void>();
  @Output() filterTodos = new EventEmitter<string>();
  @Output() deleteChecked = new EventEmitter<void>();

  constructor() { }

  doCheckAll() {
    this.checkAll.emit();
  }

  doFilterTodos(value: string) {
    this.filterTodos.emit(value);
  }

  doDeleteChecked() {
    this.deleteChecked.emit();
  }
}
