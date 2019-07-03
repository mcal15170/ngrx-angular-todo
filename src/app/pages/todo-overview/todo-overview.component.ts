import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ITodo } from 'src/app/store/models/todo.model';
import { AppState } from 'src/app/store/models/app-state.model';
import { RemoveAllToDOAction } from 'src/app/store/actions/todo.action';
import { ToastrManager } from 'ng6-toastr-notifications';
@Component({
  selector: 'app-todo-overview',
  templateUrl: './todo-overview.component.html',
  styleUrls: ['./todo-overview.component.css']
})
export class TodoOverviewComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
  }

  clearTodos() {
    this.store.dispatch(new RemoveAllToDOAction());
  }

}
