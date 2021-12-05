import React, {useState, useContext, useEffect, useCallback} from 'react'
import {AuthContext} from '../../../context/AuthContext'
import {useHttp} from '../../../hooks/http.hook'
import {Loader} from '../../Nav/Loader'
import {TodosList} from './TodosList'
// import s from './TodoListPage.module.css'

export const TodoListPage = () => {
    const [todos, setTodos] = useState()
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)
    const fetchedTodos = useCallback( async() => {
        try {
            const fetched = await request('/api/todos', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setTodos(fetched)
        } catch (e) {
            
        }

    }, [token, request])

    useEffect(() =>{
        fetchedTodos()
    }, [fetchedTodos])

    if(loading) {
        return <Loader />
    }
    return (
        <>
            {!loading && <TodosList todos={todos} />}
        </>
    )
}