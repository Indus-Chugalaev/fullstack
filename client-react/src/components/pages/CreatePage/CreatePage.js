import React, {useContext, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../context/AuthContext'
import { useHttp } from '../../../hooks/http.hook'
import s from './CreatePage.module.css'

export const CreatePage = () => {
    const navigate = useNavigate()
    const auth = useContext(AuthContext)
    const {request} = useHttp()
    const [title, setTitle] = useState('')
    const pressHandler = async event => {
        if (event.key === 'Enter') {
            console.log('enter')
            
            try {
                const data = await request('/api/todos/generate', 'POST', {title: title}, {
                    Authorization: `Bearer ${auth.token}`
                })
                console.log(data)
                
navigate(`/todos/${data.todo._id}`)                
            } catch (e) {
                
            }
        }
    }
    return (
        <div>
            <h1>Create Page</h1>
            <div className={s.info}>
            <input 
            placeholder='Введите задание' 
            id='title'
            type='text' 
            name='title'
            className={s.input} 
            value={title}
            onChange={e => setTitle(e.target.value)}
            onKeyPress={pressHandler}
            />
            </div>
        </div>
    )
}