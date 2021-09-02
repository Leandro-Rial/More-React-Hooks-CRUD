import { createContext, useEffect, useReducer } from "react";
import { ContextReducer } from "./ContextReducer";
import { types } from "../types/types";
import { v4 as uuidv4 } from 'uuid';

const initialState = {
    tasks: [
        {
            id: uuidv4(),
            title: "title one",
            description: "some description",
            done: false,
        },
        {
            id: uuidv4(),
            title: "title two",
            description: "some description two",
            done: false,
        },
    ]
}

const init = () => {
    return (
        JSON.parse(localStorage.getItem('tasks')) || initialState
    )
}

export const GlobalContext = createContext(initialState);

export const ContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(ContextReducer, initialState, init);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(state))
    }, [state])

    const addTask = (task) => {
        dispatch({
            type: types.addTask,
            payload: {...task, id: uuidv4(), done: false}
        })
    }

    const removeTask = (id) => {
        dispatch({
            type: types.removeTask,
            payload: id
        })
    }
    
    const editTask = (task) => {
        dispatch({
            type: types.editTask,
            payload: task
        })
    }

    const toggleTaskDone = (id) => {
        dispatch({
            type: types.toggleDoneTask,
            payload: id
        })
    }

    return (
        <GlobalContext.Provider value={{
            tasks: state.tasks,
            addTask,
            removeTask,
            editTask,
            toggleTaskDone
        }}>
            {children}
        </GlobalContext.Provider>
    )
}