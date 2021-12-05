import {useContext} from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import s from './Nav.module.css'



const Nav = () => {
    const navigate = useNavigate()
    const auth = useContext(AuthContext)
    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
        navigate('/')
    }
return (
    <div className={s.navbar}>

<NavLink to='/create' className={s.item}>Создать</NavLink>
<NavLink to='/todos' className={s.item}>Список дел</NavLink>
<NavLink to='/' className={s.item} onClick={logoutHandler}>Выйти</NavLink>
    </div>
)
}

export default Nav