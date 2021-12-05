import React from 'react'
import { Link } from 'react-router-dom'

export const TodoCard = ({todo}) => {
    return (
        <>
        <h2>Задание</h2>
        <p> Задание: <Link to="{todo.title}" target="_blank">{todo.title}</Link></p>
        <p> Дата создания: <strong>{new Date(todo.date).toLocaleDateString()}</strong></p>
        </>
    )
}