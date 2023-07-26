const express = require('express')
const {
    getAll,
    getById,
    createProduct,
    updateProduct,
    deleteProduct
 } = require('../Controllers/ProductController.js')

const router = express.Router()

router.get('/', getAll)
router.get('/:id', getById)
router.post('/', createProduct)
router.patch('/:id', updateProduct)
router.delete('/:id', deleteProduct)

module.exports = router;