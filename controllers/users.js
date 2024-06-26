const {prisma} = require('../prisma/prisma-client')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


 const login = async (req, res) => {
     try{
         const {email, password} = req.body

         if(!email || !password) {
             return res.status(400).json({message: 'Пожалуйста, заполните обязательные поля'})
         }

         const user = await prisma.user.findFirst({
             where: {
                 email,
             }
         })
         /*сравнить пароль с клиента и хэш пароля, который в текущем пользователе хранится*/
         const isPasswordCorrect = user && (await bcrypt.compare(password, user.password))
         const secret = process.env.JWT_SECRET

         //если все ок, то отвечаем
         if(user && isPasswordCorrect && secret) {
             res.status(200).json({
                 id: user.id,
                 email: user.email,
                 name: user.name,
                 token: jwt.sign({ id: user.id }, secret, { expiresIn: '30d' })
             })
         }else {
             return res.status(400).json({message: 'Неверно введен логин или пароль'})
         }
     }catch (error) {
         res.status(500).json({message: 'Что-то пошло не так'})
     }

}

/**
 *
 * @route POST/api/user/register
 * @desc Регистрация
 * @access Public
 */
const register = async (req, res, next) => {

    try{
        const {email, password, name} = req.body

        if(!email || !password || !name) {
            return res.send(400).json({message: 'Пожалуйста, заполните обязательные поля'})
        }
        /*проверяем есть ли такой пользователь в базе данных*/
        const registeredUser = await prisma.user.findFirst({
            where: {
                email
            }
        })
        if(registeredUser) {
            return res.status(400).json({message: 'Пользователь с таким email уже существует'})
        }
        /*зашифровать*/
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const user =  await prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword
            }
        })

        /*скрытая строка токена*/
        const secret = process.env.JWT_SECRET


        if(user && secret) {
            res.status(201).json({
                id: user.id.name,
                email: user.email,
                name,
                token: jwt.sign({ id: user.id }, secret, { expiresIn: '30d' })
            })
        }else {
            return res.status(400).json({message: 'Не удалось создать пользователя'})
        }
    }catch (error) {
        res.status(500).json({message: 'Что-то пошло не так'})
    }
    
}

/**
 *
 * @route GET/api/user/current
 * @desc Текущий пользователь
 * @access Private
 */
const current = async (req, res) => {
   return res.status(200).json(req.user)
}

module.exports = {
    login,
    register,
    current
}