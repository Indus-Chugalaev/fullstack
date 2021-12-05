import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../../../../context/AuthContext'
import { useHttp } from '../../../../hooks/http.hook'
import { Loader } from '../../../Nav/Loader'
import { TodoCard } from './TodoCard/TodoCard'

export const TodoPage = () => {
    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [todo, setTodo] = useState(null)
    const todoId = useParams().id

    const getTodo = useCallback( async () => {
        try {
            const fetched = await request(`/api/todos/${todoId}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setTodo(fetched)
        } catch (e) {
            
        }
    }, [token, todoId, request])

    useEffect( () => {
        getTodo()
    }, [getTodo]) 

    if (loading) {
        return <Loader />
    }

    return (
        <>
        <h2>Todopage</h2>
            {!loading && todo && <TodoCard todo={todo} />}
        </>
    )
}