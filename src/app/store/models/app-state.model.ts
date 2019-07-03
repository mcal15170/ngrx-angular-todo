import { ITodo } from './todo.model';

export interface AppState {
    readonly todo: Array<ITodo>
}