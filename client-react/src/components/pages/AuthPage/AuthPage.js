import React, { useState, useEffect, useContext } from 'react'
import { useHttp } from '../../../hooks/http.hook'
import {useMessage} from '../../../hooks/message.hook'
import {AuthContext} from '../../../context/AuthContext'
import s from './AuthPage.module.css'

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading, request, error, clearError} = useHttp()
    const [form, setForm] = useState({
        email: '', password: ''
    })


    useEffect(() => {
        message(error)
         clearError()
        }, 
        [error, message, clearError])

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            message(data.message)
            
        } catch (e) {} // ошибки обработали в хуке useHttp
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            // message(data.message)
            auth.login(data.token, data.userId)

            
        } catch (e) {} // ошибки обработали в хуке useHttp
    }



    return (
        <div className={s.content}>
            <div className={s.title}>Авторизация</div>
            <div className={s.info}>
            <input 
            placeholder='Введите E-mail' 
            id='email'
            type='text' 
            name='email'
            className={s.input} 
            value={form.email}
            onChange={changeHandler}
            />
            </div>
            <div className={s.info}>
            <input 
            placeholder='Введите пароль' 
            id='password'
            type='password' 
            name='password'
            className={s.input} 
            value={form.password}
            onChange={changeHandler}
            />
            </div>
            <button 
            className={s.logIn}
            onClick={loginHandler}
            disabled={loading}
            >
                Войти
                </button>
            <button 
            className={s.reg}
            onClick={registerHandler}
            disabled={loading}
            >
                Регистрация
                </button>
        
        </div>
    )
}