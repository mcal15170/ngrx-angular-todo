import { Action } from '@ngrx/store';
import { ITodo, ISELECT } from '../models/todo.model';

export enum TodoTypes {
    ADD_TODO = 'ADD_TODO',
    UPDATE_TODO = 'UPDATE_TODO',
    TOGGLE_TODO = 'TOGGLE_TODO',
    REMOVE_TODO = 'REMOVE_TODO',
    REMOVE_ALL_TODOS = 'REMOVE_ALL_TODOS'


}

export enum SelectType {
    ADD_SELECT_DATA = 'ADD_SELECT_DATA'
}

export class AddToDOAction implements Action {
    readonly type = TodoTypes.ADD_TODO

    constructor(public payload: any) { }
}

export class UpdateToDoAction implements Action {
    readonly type = TodoTypes.UPDATE_TODO

    constructor(public payload: ITodo) { }
}

export class ToggleToDoAction implements Action {
    readonly type = TodoTypes.TOGGLE_TODO

    constructor(public payload: number) { }
}

export class RemoveToDoAction implements Action {
    readonly type = TodoTypes.REMOVE_TODO

    constructor(public payload: number) { }
}

export class RemoveAllToDOAction implements Action {
    readonly type = TodoTypes.REMOVE_ALL_TODOS

    constructor(public payload: any) { }
}

export class AddSelectData implements Action {
    readonly type = SelectType.ADD_SELECT_DATA
    constructor(public payload: ISELECT[]) { }
}

export type TodoAction = AddToDOAction | ToggleToDoAction | RemoveToDoAction | RemoveAllToDOAction | UpdateToDoAction | AddSelectData;
