import { ITodo } from '../models/todo.model';
import { TodoTypes, TodoAction } from '../actions/todo.action';


const initialState: Array<ITodo> = [
    {
        id: 1,
        description: "test",
        responsible: "test",
        priority: "low",
        isCompleted: false
    }
];




export function todoReducer(state: Array<ITodo> = initialState, action: TodoAction) {
    switch (action.type) {
        case TodoTypes.ADD_TODO:
            action.payload.id = state.length + 1;
            return [...state, action.payload];
        case TodoTypes.UPDATE_TODO:
            var todo = state.find(t => t.id === action.payload.id);
            var index = state.indexOf(todo);
            state[index].description = action.payload.description;
            state[index].responsible = action.payload.responsible;
            state[index].priority = action.payload.priority;
            return state;
        case TodoTypes.TOGGLE_TODO:
            var todo = state.find(t => t.id === action.payload);
            var index = state.indexOf(todo);
            state[index].isCompleted = !state[index].isCompleted
            return state;
        case TodoTypes.REMOVE_TODO:
            return state.filter(item => item.id !== action.payload);

        case TodoTypes.REMOVE_ALL_TODOS:
            return [];

        default:
            return state;

    }

}