import inquirer  from 'inquirer'
import 'colors'

const menuOpts = [
    {
        type: 'list',
        name: 'option',
        message: '¿Qué desea hacer?',
        choices: [
            {
                value: '1',
                name: `${'1'.red}. Crear tarea`
            },
            {
                value: '2',
                name: '2. Listar tareas'
            },
            {
                value: '3',
                name: '3. Listar tareas completadas'
            },
            {
                value: '4',
                name: '4. Listar tareas pendientes'
            },
            {
                value: '5',
                name: '5. Marcar/desmarcar tarea(s)'
            },
            {
                value: '6',
                name: '6. Borrar tarea'
            },
            {
                value: '7',
                name: '7. Salir'
            }
        ]
    }
]

const showMenu = async() => {
    console.clear()
    console.log('= = = = = = = = = = = = = = ='.yellow)
    console.log('   Mis tareas'.white)
    console.log('- - - - - - - - - - - - - - -'.yellow)

    const { option } = await inquirer.prompt(menuOpts)

    return option
}

export const deleteTaskList = async(tasks = []) => {
    const choices = tasks.map((task, i) => {
        const idx = `${i + 1}.`.green

        return {
            value: task.id,
            name: `${idx} ${task.desc}`,
            // loop: false,
        }
    }) 

    choices.unshift({
        value: '0',
        name: '0.'.red + 'Cancel operation.'
    })

    const questions = [
        {
            type: 'list',
            name: 'id',
            message: 'Delete task',
            choices
        }
    ]

    const { id } = await inquirer.prompt(questions)

    return id
}

export const checkTaskList = async(tasks = []) => {
    const choices = tasks.map((task, i) => {
        const idx = `${i + 1}.`.green

        return {
            value: task.id,
            name: `${idx} ${task.desc}`,
            checked: (task.doneDate) ? true : false
        }
    }) 

    const question = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Select task',
            choices
        }
    ]

    const { ids } = await inquirer.prompt(question)

    return ids
}

export const confirmOp = async(message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            default: false,
            message
        }
    ]

    const { ok } = await inquirer.prompt(question)

    return ok
}

export const pause = async() => {
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${ 'ENTER'.red } para continuar...`
        }
    ]

    console.log('\n')

    await inquirer.prompt(question)
}

export const readInput = async(message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if (value.length === 0) {
                    return 'Por favor ingrese la tarea...'
                }
                return true
            }
        }
    ]

    const { desc } = await inquirer.prompt(question)

    return desc
}

export default showMenu