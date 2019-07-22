import { ITodo, ISELECT } from './todo.model';

export interface AppState {
    readonly todos: ITodo[];
    readonly lastUpdate: Date;
    readonly selectList: ISELECT[];
    readonly lastId: number;

}