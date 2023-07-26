const express = require('express')
const {
    getAll,
    getById,
    createUser,
    updateUser,
    deleteUser
} = require('../Controllers/UserController.js')

const router = express.Router()

router.get('/', getAll)
router.get('/:id', getById)
router.post('/', createUser)
router.patch('/:id', updateUser)
router.delete('/:id', deleteUser)

module.exports = router;