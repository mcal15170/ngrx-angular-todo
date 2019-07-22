import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ITodo, ISELECT } from 'src/app/store/models/todo.model';
import { RemoveToDoAction, AddToDOAction, ToggleToDoAction, UpdateToDoAction, AddSelectData, RemoveAllToDOAction } from 'src/app/store/actions/todo.action';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppState } from 'src/app/store/models/app-state.model';
import { SelectService } from '../select.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  actionButton;
  todoList$: Observable<ITodo[]>;
  selectList$: Observable<ISELECT[]>;
  AllDeleteId = [];

  constructor(public store: Store<AppState>, private formBuilder: FormBuilder, private testService: SelectService) { }


  ngOnInit() {
    this.testService.getCollection().subscribe((res: any) => {
      this.store.dispatch(new AddSelectData(res));
    })

    this.store.select(state => state).subscribe((data: any) => {
      this.todoList$ = data.todo.todos;
      this.selectList$ = data.todo.selectList;
    });




    this.registerForm = this.formBuilder.group({
      id: [],
      description: ['', Validators.required],
      responsible: ['', Validators.required],
      priority: ['', Validators.required],
      isCompleted: [false]
    });
    this.actionButton = 'Create';
  }


  removeTodo(id: number) {
    this.store.dispatch(new RemoveToDoAction(id));
  }

  toggleTodo(id: number) {
    this.store.dispatch(new ToggleToDoAction(id));
  }

  updateTodo(data: ITodo) {
    this.registerForm.setValue({
      id: data.id,
      description: data.description,
      responsible: data.responsible,
      priority: data.priority,
      isCompleted: data.isCompleted
    });
    this.actionButton = 'Update'
  }


  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    if (this.registerForm.value.id) {
      this.store.dispatch(new UpdateToDoAction(this.registerForm.value));

    } else {
      this.store.dispatch(new AddToDOAction(this.registerForm.value));


    }
    this.registerForm.reset();
    this.submitted = false;
    this.actionButton = 'Create'
  }

  onChange(event, id) {

    if (event.checked) {
      this.AllDeleteId.push(id);

    } else {
      for (var i = 0; i < this.AllDeleteId.length; i++) {
        if (this.AllDeleteId[i] === id) {
          this.AllDeleteId.splice(i, 1);
        }
      }
    }

    console.log(this.AllDeleteId);


  }

  updateDeleteStatus(){
    if(this.AllDeleteId.length > 0 ){
      this.store.dispatch(new RemoveAllToDOAction(this.AllDeleteId));
      this.AllDeleteId=[];
    }
  }
}
