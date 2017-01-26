import mongoose from 'mongoose'
import {HOST, DB_NAME} from './options'

mongoose.connect(`${HOST}${DB_NAME}`)
const db = mongoose.connection

export default db
