import {TasksStateType} from '../App';
import {v1} from "uuid";
import {AddTodolistActionType} from "./todolists-reducer";

type ActionsType = RemoveTasksActionType
    | AddTasksActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(task => task.id !== action.taskId)
            }
        case 'ADD-TASK':
            return {
                ...state,
                [action.todolistId]: [{id: v1(), title: action.title, isDone: false}, ...state[action.todolistId]]
            }
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(task => task.id === action.taskId ? {...task, isDone: action.isDone} : task)
            }
        case "CHANGE-TASK-TITLE":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(task => task.id === action.taskId ? {...task, title: action.title} : task)
            }

        case "ADD-TODOLIST":
            return {
                ...state,
                [action.todolistId]:[]
            }

        default:
            throw new Error("I don't understand this type")
    }
}

export const removeTaskAC = (taskId: string, todolistId: string) => ({type: 'REMOVE-TASK', taskId, todolistId}) as const
export type RemoveTasksActionType = ReturnType<typeof removeTaskAC>

export const addTaskAC = (title: string, todolistId: string) => ({type: 'ADD-TASK', title, todolistId}) as const
export type AddTasksActionType = ReturnType<typeof addTaskAC>

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string) => ({
    type: 'CHANGE-TASK-STATUS', taskId, isDone, todolistId
}) as const
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => ({
    type: 'CHANGE-TASK-TITLE', taskId, title, todolistId
}) as const
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>




