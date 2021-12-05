const {Router} = require('express')
const Todo = require('../models/Todo')
const auth = require('../middleware/auth.middleware')
const router = Router()

router.post('/generate', auth, async (req, res) => {
    try {
        const {title} = req.body // получаем с фронтэнда
        const existing = await Todo.findOne({title}) //проверка на наличие подобной записи в бд
        if (existing) {
            return res.json({ todo: existing })
        }
        const todo = new Todo({
            title: title, owner: req.user.userId
        }) //создаем новый todo
        
        await todo.save() // ждем сохранения todo в бд
        
        res.status(201).json({ todo })
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова'})
    }
})

router.get('/', auth, async (req, res) => {
    try {
    const todos = await Todo.find({ owner: req.user.userId}) // поиск списка дел по конкретному пользователю
    res.json(todos)
} catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова'})
}
 
})
 
router.get('/:id', auth, async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id) // поиск дела по id
        res.json(todo)
    
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова'})
    }

})

module.exports = router