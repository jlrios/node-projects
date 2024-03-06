// const fs = require("fs");
import * as fs from 'fs'

const dataFile = './data/data.json'

export const saveData = (data) => {
    // console.log('Data to save: ', data)
    fs.writeFileSync(dataFile, JSON.stringify(data))    
}

export const readData = () => {
    if (!fs.existsSync(dataFile)) {
        return null
    }
    const info = fs.readFileSync(dataFile, { encoding: 'utf-8' })
    const data = JSON.parse(info)

    return data
}

/* module.exports = {
    saveData
} */