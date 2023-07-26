const { PrismaClient } = require("@prisma/client");
const Prisma = new PrismaClient()
const product = Prisma.product

const getAll = async (req, res) => {
    try {
        const data = await product.findMany()
        res.status(200).json(data)
    } catch (error) {
        console.log(error)
    }
}

const getById = async (req, res) => {
    try {
        const { id } = req.params
        const data = await product.findUnique(
            {
                where: {
                    id: id
                }
            }
        )
        res.status(200).json(data)
    } catch (error) {
        console.log(error)
    }
}

const createProduct = async (req, res) => {
    const { nameProduct, price, expired, userId } = req.body
    try {
        await product.create({
            data: {
                nameProduct: nameProduct,
                price: price,
                expired: expired,
                userId: userId
            }
        })
        res.status(201).json({ msg: "User Created" })
    } catch (error) {
        console.log(error)
    }
}

const updateProduct = async (req, res) => {
    const { id } = req.params
    const { nameProduct, price, expired, userId } = req.body
    try {
        await product.update({
            where: {
                id: id
            },
            data: {
                nameProduct: nameProduct,
                price: price,
                expired: expired,
                userId: userId
            }
        })
        res.status(200).json({ msg: "User Update" })
    } catch (error) {
        console.log(error)
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params
        await product.delete(
            {
                where: {
                    id: id
                }
            }
        )
        res.status(200).json({ msg: "User Deleted" })
    } catch (error) {
        console.log(error)
    }
}



module.exports = {
    getAll,
    getById,
    createProduct,
    updateProduct,
    deleteProduct
}