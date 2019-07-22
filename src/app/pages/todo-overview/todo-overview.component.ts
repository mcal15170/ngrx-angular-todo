import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ITodo } from 'src/app/store/models/todo.model';
import { AppState } from 'src/app/store/models/app-state.model';
@Component({
  selector: 'app-todo-overview',
  templateUrl: './todo-overview.component.html',
  styleUrls: ['./todo-overview.component.css']
})
export class TodoOverviewComponent implements OnInit {

  lastUpdate: Observable<Date>;
  todoList$: Observable<ITodo[]>;
  complete: number;
  unComplete: number;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.select(state => state).subscribe((data: any) => {
      this.lastUpdate = data.todo.lastUpdate;
      this.todoList$ = data.todo.todos;
      this.complete = data.todo.todos.filter(item => item.isCompleted === true).length;
      this.unComplete = data.todo.todos.filter(item => item.isCompleted === false).length;

    });
  }
}
