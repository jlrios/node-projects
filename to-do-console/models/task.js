import { v4 as uuidv4 } from 'uuid' 

class Task {
    id = ''
    desc = ''
    doneDate = null

    constructor(desc) {
        console.log({ desc })
        this.id = uuidv4()
        this.desc = desc
    }
}

export default Task