import {TasksStateType} from '../App';
import {v1} from "uuid";

type ActionsType = RemoveTasksActionType | AddTasksActionType

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

        default:
            throw new Error("I don't understand this type")
    }
}

export const removeTaskAC = (taskId: string, todolistId: string) => ({type: 'REMOVE-TASK', taskId, todolistId}) as const
export type RemoveTasksActionType = ReturnType<typeof removeTaskAC>

export const addTaskAC = (title: string, todolistId: string) => ({type: 'ADD-TASK', title, todolistId}) as const
export type AddTasksActionType = ReturnType<typeof addTaskAC>




