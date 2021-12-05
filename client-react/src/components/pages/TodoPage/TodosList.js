import React from 'react'
import {Link} from 'react-router-dom'

export const TodosList = ({todos}) => {
    console.log(!todos)
    if (!todos) {
        return <p>Заданий пока нет</p>
    }
    return (
        <> 
        {todos.map((todo, index) =>{
            return (
               <p>
                   <Link to={`/todos/${todo._id}`}>
                       {/* key={todo._id} */}
                   {/* {index + 1}  */}
                   {todo.title} 
                   </Link>
   
               </p> 

            )
        })}
        </>
    )
}