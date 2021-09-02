import { types } from "../types/types";

export const ContextReducer = (state = {}, action) => {
    switch (action.type) {
        case types.addTask:
            
            return {
                ...state,
                tasks: [action.payload, ...state.tasks]
            }
        
        case types.removeTask:
            
            return {
                ...state,
                tasks: state.tasks.filter(task => task.id !== action.payload)
            }
            
            case types.editTask:
    
                const updatedTask = action.payload;
    
                const updatedTasks = state.tasks.map(task => {
                    if(task.id === updatedTask.id) {
                        return updatedTask
                    }
    
                    return task;
                })
                
                return {
                    ...state,
                    tasks: updatedTasks
                }
            
            case types.toggleDoneTask:
    
                const updatedDoneTasks = state.tasks.map(task => 
                    task.id === action.payload ? {...task, done: !task.done} : task
                );
                
                return {
                    ...state,
                    tasks: updatedDoneTasks
                }

            
        default:
            return state;
    }
}