import mongoose from 'mongoose'
import colors from 'colors'
import createLogger from './utils/custromLog'
import data from './utils/games.json'
import {COLLECTION_NAME} from './utils/options'
import Product from './utils/model'
import db from './utils/dbConnection'

mongoose.Promise = Promise
let COUNTER = 0
const log = createLogger()

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
      const MESSAGE = (COUNTER === data.length) ? `All data was added to DB successfuly` : `ERROR: ${data.length - COUNTER} missing pieces of data`
      console.log(colors.red.bold(`\n${MESSAGE}\n`))
      log(`close database`)
    })
  })
})
