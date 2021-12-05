import {
    useState,
    useCallback
} from 'react'

export const useHttp = () => {
    const [loading, setLoading] = useState(false) //идет ли загрузка, по умолчанию - нет
    const [error, setError] = useState(null) //есть ли ошибка, по умолчанию - нет
    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        setLoading(true) // идет загрузка
        try {
            if (body) {
                body = JSON.stringify(body) //если есть бади, то стрингифай бади, приведем его к строке
                headers['Content-Type'] = 'application/json' // тип передаваемых данных json
            }
            const response = await fetch(url, { method, body, headers })
            const data = await response.json() // ждем ответа от сервера и приводит его к формату json

            if (!response.ok) {
                throw new Error(data.message || 'Что-то пошло не так') // если нет ответа от сервера - выкидываем эту ошибку или "что-то пошло не так"
            }
            setLoading(false) // загрузка закончилась
            return data // возвращаем дату
        } catch (e) {
            setLoading(false) // загрузка закончилась
            setError(e.message) // в ошибку записываем ошибку
            throw e // выкидываем возникшую ошибку

        }
    }, [])

    const clearError = useCallback( () => setError(null), []) //чистим ошибку

    return {
        loading,
        request,
        error,
        clearError
    } // возвращаем статус загрузки, ответ и ошибку
}