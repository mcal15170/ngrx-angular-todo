import { AppState } from '../models/app-state.model';
import { TodoTypes, TodoAction } from '../actions/todo.action';



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
    selectList: [
        {
            id: 'low',
            lable: 'low'
        },
        {
            id: 'medium',
            lable: 'medium'
        },
        {
            id: 'high',
            lable: 'high'
        },

    ]
}


export function todoReducer(state: any = initialState, action: TodoAction) {
    switch (action.type) {
        case TodoTypes.ADD_TODO:
            action.payload.id = state.todos.length + 1;
            action.payload.isCompleted = false
            return {
                todos: [...state.todos, action.payload],
                lastUpdate: new Date(),
                selectList: [...state.selectList]
            }
        case TodoTypes.UPDATE_TODO:
            var todo = state.todos.find(t => t.id === action.payload.id);
            var index = state.todos.indexOf(todo);
            state.todos[index].description = action.payload.description;
            state.todos[index].responsible = action.payload.responsible;
            state.todos[index].priority = action.payload.priority;
            return {
                todos: [...state.todos],
                lastUpdate: new Date(),
                selectList: [...state.selectList]
            }
        case TodoTypes.TOGGLE_TODO:
            var todo = state.todos.find(t => t.id === action.payload);
            var index = state.todos.indexOf(todo);
            state.todos[index].isCompleted = !state.todos[index].isCompleted
            return {
                todos: [...state.todos],
                lastUpdate: new Date(),
                selectList: [...state.selectList]
            }
        case TodoTypes.REMOVE_TODO:
            return {
                todos: [...state.todos.filter(item => item.id !== action.payload)],
                lastUpdate: new Date(),
                selectList: [...state.selectList]
            }

        case TodoTypes.REMOVE_ALL_TODOS:
            return {
                todos: [],
                lastUpdate: new Date(),
                selectList: [...state.selectList]
            }

        default:
            return state;

    }

}