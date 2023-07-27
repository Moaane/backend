const { PrismaClient } = require("@prisma/client");
const Prisma = new PrismaClient()
const users = Prisma.users

const getAll = async (req, res) => {
    try {
        const data = await users.findMany()
        res.status(200).json(data)
    } catch (error) {
        console.log(error)
    }
}

const getById = async (req, res) => {
    try {
        const { id } = req.params
        const data = await users.findUnique(
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

const createUser = async (req, res) => {
    const { name, address } = req.body
    try {
        await users.create({
            data: {
                name: name,
                address: address
            }
        })
        res.status(201).json({ msg: "User Created" })
    } catch (error) {
        console.log(error)
    }
}

const updateUser = async (req, res) => {
    const { id } = req.params
    const { name, address } = req.body
    try {
        await users.update({
            where: {
                id: id
            },
            data: {
                name: name,
                address: address
            }
        })
        res.status(200).json({ msg: "User Update" })
    } catch (error) {
        console.log(error)
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params
        await users.delete(
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
    createUser,
    updateUser,
    deleteUser
}   