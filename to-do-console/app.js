import 'colors/index.js'
import showMenu, { checkTaskList, confirmOp, deleteTaskList, pause, readInput } from './menu/menu.js'
import Tasks from './controllers/tasks.js'
import { readData, saveData } from './data/saveData.js'

/**
 * Entry point.
 */
const main = async() => {
    let opt = ''

    const myTasks = new Tasks()
    const tasksData = readData()

    if (tasksData) {
        myTasks.loadTasks(tasksData)
    }

    do {
        opt = await showMenu()

        switch(opt) {
            case '1': 
                const desc = await readInput('Descripción de la tarea: ')
                myTasks.createTask(desc)
                break
            case '2':
                myTasks.showAllTasks()
                break
            case '3':
                myTasks.showDoneTasksList(true)
                break
            case '4':
                myTasks.showDoneTasksList(false)
                break
            case '5':
                const ids = await checkTaskList(myTasks.listTasks)
                myTasks.toggleTasks(ids)
                break
            case '6':
                const id = await deleteTaskList(myTasks.listTasks)
                console.log('Task Id: ', id)
                if (id !== '0') {
                    const ok = await confirmOp('¿Estás seguro?')
                    console.log('OK: ', ok)
                    if (ok) {
                        myTasks.deleteTask(id)
                        console.log('Tarea eliminada...')
                    }
                }
                break
            case '7':
                console.log('End of line.')
        }

        saveData(myTasks.listTasks)

        await pause()

    } while(opt !== '7')
}

main().catch(console.error)