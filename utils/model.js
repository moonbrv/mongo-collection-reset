import mongoose from 'mongoose'
import schema from './gameSchema'
import {COLLECTION_NAME} from './options'

const model = mongoose.model(COLLECTION_NAME, schema)

export default model
