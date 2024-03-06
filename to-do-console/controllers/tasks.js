import Task from '../models/task.js'

class Tasks {
    get listTasks() {
        const list = []
        Object.keys(this._list).forEach(key => {
            const task = this._list[key]
            list.push(task)
        })
        return list
    }
    
    constructor() {
        this._list = {}
    }

    deleteTask(id = '') {
        if (this._list[id]) {
            delete this._list[id]
        }
    }

    createTask(desc = '') {
        const task = new Task(desc)
        this._list[task.id] = task
    }

    loadTasks(tasks = []) {
        tasks.forEach(task => {
            this._list[task.id] = task
        })
    }

    showAllTasks() {
        console.log()

        this.listTasks.forEach((task, i) => {
            const idx = `${i + 1}`.green
            const { desc, doneDate } = task
            const status = (doneDate) ? 'Completada'.green : 'Pendiente'.red

            console.log(`${idx} ${desc} :: ${status}`)
        })
    }

    showDoneTasksList(done = true) {
        console.log()

        let count = 0

        this.listTasks.forEach(task => {
            const { desc, doneDate } = task
            const status = (doneDate) ? 'Completada'.green : 'Pendiente'.red

            if (done) {
                if (doneDate) {
                    count += 1
                    console.log(`${ (count + '.').green } ${ desc } :: ${ doneDate.green }`)
                }
            } else {
                if (!doneDate) {
                    count += 1
                    console.log(`${ (count + '.').green } ${ desc } :: ${ status }`);
                }
            }
        })
    }

    toggleTasks(ids = []) {
        ids.forEach(id => {
            const task = this._list[id]

            if (!task.doneDate) {
                task.doneDate = new Date().toISOString()
            }
        })

        this.listTasks.forEach(task => {
            if (!ids.includes(task.id)) {
                this._list[task.id].doneDate = null
                // task.doneDate = null
            }
        })
    }
}

export default Tasks