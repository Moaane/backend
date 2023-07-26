const bycrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const { PrismaClient } = require('@prisma/client')
const Prisma = new PrismaClient()
const usersLogin = Prisma.users_login

const loginUser = async (req, res) => {
    const { username, password } = req.body

    try {
        const isUserValid = await usersLogin.findFirst({
            where: {
                username: username
            }
        })
        if (!isUserValid) {
            return res.status(400).json({ msg: "User Not Found" })
        }

        const isPasswordValid = await bycrypt.compare(password, isUserValid.password)
        if (!isPasswordValid) {
            return res.status(400).json({ msg: "Password Is Not Valid" })
        }
        const secretKey = crypto.randomBytes(10).toString('hex')
        const token = jwt.sign({ id: isUserValid.id }, secretKey)

        const updateUserToken = await usersLogin.update({
            data: {
                token: token
            },
            where: {
                id: isUserValid.id
            }
        })

        res.json({ msg: "Success Login" })
    } catch (error) {
        console.log(error)
    }
}

const registerUser = async (req, res) => {
    const { username, password, confirmPassword } = req.body
    try {
        if (password != confirmPassword) {
            return res.status(400).json({ msg: "Password Not Match" })
        }
        const isUserValid = await usersLogin.findFirst({
            where: {
                username: username
            }
        })
        if (!isUserValid) {
            const createUsername = username
            const hashPassword = await bycrypt.hash(password, 10)

            const data = await usersLogin.create({
                data: {
                    username: createUsername,
                    password: hashPassword
                }
            })

            res.json({ msg: "Success Register" })
        } else {
            return res.status(400).json({ msg: "User Is Available, try another username" })
        }
    } catch (error) {
        console.log(error)
    }
}

const logoutUser = async (req, res) => {
    const { id } = req.params
    try {
        const data = await usersLogin.update({
            data: {
                token: null
            },
            where: {
                id:id
            }
        })

        if (!data) {
            return res.status(400).json({ msg: "Id Not Found" })
        }
        res.json({ msg: "Success Logout" })
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    loginUser,
    registerUser,
    logoutUser
}