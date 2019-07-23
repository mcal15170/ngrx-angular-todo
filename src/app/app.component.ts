import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/models/app-state.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ngrx-todo-list';
  themeColor: string;

  constructor(public store: Store<AppState>) { }

  ngOnInit() {
    this.store.select(state => state).subscribe((data: any) => {
      this.themeColor = data.todo.colorName;
    });
  }


}
