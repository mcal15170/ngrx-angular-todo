import { AppState } from '../models/app-state.model';
import { TodoTypes, SelectType, ThemeType, TodoAction } from '../actions/todo.action';

const initialState: AppState = {
    todos: [
        {
            id: 1,
            description: "test",
            responsible: "jon",
            priority: "medium",
            isCompleted: false
        }
    ],
    lastUpdate: new Date(),
    selectList: [],
    lastId: 1,
    colorName: 'accent'
}


export function todoReducer(state: any = initialState, action: TodoAction) {
    switch (action.type) {
        case TodoTypes.ADD_TODO:
            action.payload.id = state.lastId + 1;

            action.payload.isCompleted = false
            return {
                todos: [...state.todos, action.payload],
                lastUpdate: new Date(),
                selectList: [...state.selectList],
                lastId: action.payload.id,
                colorName: state.colorName
            }
        case TodoTypes.UPDATE_TODO:
            var todo = state.todos.find(t => t.id === action.payload.id);
            var index = state.todos.indexOf(todo);
            state.todos[index].description = action.payload.description;
            state.todos[index].responsible = action.payload.responsible;
            state.todos[index].priority = action.payload.priority;
            state.todos[index].isCompleted = action.payload.isCompleted;
            return {
                todos: [...state.todos],
                lastUpdate: new Date(),
                selectList: [...state.selectList],
                lastId: state.lastId,
                colorName: state.colorName
            }
        case TodoTypes.TOGGLE_TODO:
            var todo = state.todos.find(t => t.id === action.payload);
            var index = state.todos.indexOf(todo);
            state.todos[index].isCompleted = !state.todos[index].isCompleted
            return {
                todos: [...state.todos],
                lastUpdate: new Date(),
                selectList: [...state.selectList],
                lastId: state.lastId,
                colorName: state.colorName
            }
        case TodoTypes.REMOVE_TODO:
            return {
                todos: [...state.todos.filter(item => item.id !== action.payload)],
                lastUpdate: new Date(),
                selectList: [...state.selectList],
                lastId: state.lastId,
                colorName: state.colorName
            }

        case TodoTypes.REMOVE_ALL_TODOS:
            return {
                todos: [...state.todos.filter(item => item.id !== action.payload.find(data => data == item.id))],
                lastUpdate: new Date(),
                selectList: [...state.selectList],
                lastId: state.lastId,
                colorName: state.colorName
            }


        case SelectType.ADD_SELECT_DATA:
            return {
                todos: [...state.todos],
                lastUpdate: new Date(),
                selectList: [...state.selectList, ...action.payload],
                lastId: state.lastId,
                colorName: state.colorName
            }

        case ThemeType.ADD_THEME_COLOR:
            return {
                todos: [...state.todos],
                lastUpdate: new Date(),
                selectList: [...state.selectList],
                lastId: state.lastId,
                colorName: action.payload
            }

        default:
            return state;

    }

}