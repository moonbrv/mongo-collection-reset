import mongoose from 'mongoose'
import createLogger from './utils/custromLog'
import games from './utils/games.json'
import {COLLECTION_NAME} from './utils/options'
import Product from './utils/model'
import db from './utils/dbConnection'

mongoose.Promise = Promise
let COUNTER = 0
const log = createLogger()
const data = [...games, ...games, ...games, ...games]
log(`games total: ${data.length}`, 'red')

const insertions = data.forEach(x => {
  const newProduct = new Product(Object.assign({}, x))
  newProduct.save((err) => {
    if (err) return console.error(err)
    COUNTER += 1
  })
})

db.collections[`${COLLECTION_NAME}s`].drop(() => {
  log('collection was droped', 'magenta')

  Promise.all([insertions]).then((values) => {
    db.close(() => {
      console.log(`WAS INSERTED ${COUNTER}`)
      log(`close database`)
    })
  })
})
