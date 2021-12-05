import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import {TodoPage} from './components/pages/TodoPage/TodoPage/TodoPage'
import {CreatePage} from './components/pages/CreatePage/CreatePage'
import {TodoListPage} from './components/pages/TodoPage/TodoListPage'
import {AuthPage} from './components/pages/AuthPage/AuthPage'



export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Routes>
                <Route path="/todos" exact element={<TodoListPage />}>
                </Route>
                <Route path="/create" exact element={<CreatePage />}>
                </Route> 
                <Route path="/todos/:id" element={<TodoPage />}>
                </Route>
                <Route path="*" element={<Navigate to="/create" />} /> 
                {/* перенаправление с несуществующих страниц */}
            </Routes>
        )
    }

    return (
        <Routes>
              <Route path="/" exact element={<AuthPage />}>
                </Route>
                <Route path="*" element={<Navigate to="/" />} />
                {/* перенаправление со всех страниц */}
        </Routes>
    )
}

