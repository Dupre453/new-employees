const {prisma} = require('../prisma/prisma-client')

/**
 *
 * @route GET/api/employees
 * @desc Получение всех сотрудников
 * @access Private
 */
const all = async (req, res) => {
    try {
        const employees = await prisma.employee.findMany()

        //отправь всех сотрудников
        res.status(200).json(employees)
    } catch {
        res.status(500).json({message: 'Не удалось получить сотрудников'})
    }
}
/**
 *
 * @route POST/api/employees/add
 * @desc Добавление сотрудника
 * @access Private
 */
const add = async (req, res) => {
    try {
        const data = req.body;

        if (!data.firstName || !data.lastName || !data.address || !data.age) {
            return res.status(400).json({message: 'Все поля обязательные'})
        }

      /*   await prisma.user.update({
            where: {
                id:req.user.id
            },
            data: {
                createdEmployee: {
                    create: data
                }
            }
        })*/

        const employee = await prisma.employee.create({
            data: {
               ...data,
                userId: req.user.id
            }
        })

        return res.status(201).json(employee)

    } catch (error) {
        res.status(500).json({message: 'Что-то пошло не так'})
    }
}

/**
 *
 * @route POST/api/employees/remove/:id
 * @desc Удаление сотрудника
 * @access Private
 */
const remove = async (req, res) => {
const {id} = req.body

    try {
        await prisma.employee.delete({
            where: {
                id
            }
        })

        res.status(204).json({messages: 'ok'})
    }catch{
    res.status(500).json({messages: 'Не удалось удалить сотрудника'})
    }
}



/**
 *
 * @route PUT/api/employees/remove/:id
 * @desc Редактирование сотрудника
 * @access Private
 */

const edit = async (req, res) => {
    const data = req.body
    const id = data.id

    try {
        await prisma.employee.update({
            where: {
                id
            },
            data
        })

        res.status(204).json({messages: 'ok'})
    } catch (error) {
        res.status(500).json({message: 'Не удалось отредактировать сотрудника'})
    }
}


/**
 *
 * @route GET/api/employees/:id
 * @desc Получение сотрудника
 * @access Private
 */

const employee = async (req,res) => {
const {id} = req.params

    try{
        const employee = await prisma.employee.findUnique({
            where: {
                id
            }
        })

        res.status(200).json(employee)
    } catch (error) {
    res.status(500).json({message: 'Не удалось получить сотрудника'})
    }
}
module.exports = {
    all,
    add,
    remove,
    edit,
    employee
}