import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ITodo, ISELECT } from 'src/app/store/models/todo.model';
import { RemoveToDoAction, AddToDOAction, ToggleToDoAction, UpdateToDoAction, AddSelectData, RemoveAllToDOAction, AddThemeColor } from 'src/app/store/actions/todo.action';
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
  onActionStatus: boolean = false;
  inlineEdit: boolean = false;
  currentEdit: number = null;
  edt_desc: string;
  edt_resp: string;
  edt_prio: string;
  edt_status: boolean;
  inlineEditData: ITodo;
  mashDeletStatus: boolean = false;
  allCheckBox: boolean = false;
  mainCheckBox: boolean = false;
  themeColor: string;

  constructor(public store: Store<AppState>, private formBuilder: FormBuilder, private testService: SelectService) { }


  ngOnInit() {
    this.testService.getCollection().subscribe((res: any) => {
      this.store.dispatch(new AddSelectData(res));
    })

    this.store.select(state => state).subscribe((data: any) => {
      this.todoList$ = data.todo.todos;
      this.selectList$ = data.todo.selectList;
      this.themeColor = data.todo.colorName;
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
    this._snackBar.open(message, action, {
      duration: 2000,
    });
    this.submitted = false;
    this.actionButton = 'Create'
  }

  onSubmitInlineEdit() {

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
    this.mashDeletStatus = this.AllDeleteId.length > 0 ? true : false;
    console.log(this.AllDeleteId);
  }

  checkUncheckAll(event) {

    if (event.checked) {
      this.allCheckBox = true;
      this.mashDeletStatus = true;
      for (var i = 0; i < Object.keys(this.todoList$).length; i++) {
        this.AllDeleteId.push(this.todoList$[i].id);
      }


    } else {
      this.allCheckBox = false;
      this.mashDeletStatus = false;
      this.AllDeleteId = [];
    }
    console.log(this.AllDeleteId);
  }

  updateDeleteStatus() {
    if (this.AllDeleteId.length > 0) {
      this.store.dispatch(new RemoveAllToDOAction(this.AllDeleteId));
      this.AllDeleteId = [];
      this.mainCheckBox = false;

    }
  }

  updateOnActionStatus() {
    this.onActionStatus = !this.onActionStatus;
    this.mashDeletStatus = !this.onActionStatus ? false : null;

  }

  changeInlineEditStatus(data: ITodo) {
    this.inlineEdit = !this.inlineEdit;
    this.currentEdit = data.id;
    this.edt_desc = data.description;
    this.edt_resp = data.responsible
    this.edt_prio = data.priority;
    this.edt_status = data.isCompleted;
  }

  saveInlineData(data: ITodo) {
    this.inlineEdit = !this.inlineEdit;
    this.inlineEditData = {
      id: this.currentEdit,
      description: this.edt_desc.length > 0 ? this.edt_desc : data.description,
      responsible: this.edt_resp.length > 0 ? this.edt_resp : data.responsible,
      priority: this.edt_prio,
      isCompleted: this.edt_status
    }
    this.store.dispatch(new UpdateToDoAction(this.inlineEditData));
  }

  changeThemeColor(color: string) {
    this.store.dispatch(new AddThemeColor(color));
  }
}
