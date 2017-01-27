import mongoose from 'mongoose'
import colors from 'colors'
import createLogger from './utils/custromLog'
import data from './utils/games.json'
import {COLLECTION_NAME} from './utils/options'
import Product from './utils/model'
import db from './utils/dbConnection'

// change mongoose promise to ES6 promise
mongoose.Promise = Promise

// counter for insertion feedback
let COUNTER = 0

// create function custrom logger, that log only in development
const log = createLogger()

log(`games total: ${data.length}`, 'red')

const insertions = data.map(x => new Product(Object.assign({}, x))
.save((err) => {
    if (err) return console.error(err)
    COUNTER += 1
  })
)

db.collections[`${COLLECTION_NAME}s`].drop((err) => {
  if (err) return console.error(err)
  log('collection was droped', 'magenta')

  Promise.all(insertions).then((values, err) => {
    db.close(() => {
      const MESSAGE = (COUNTER === data.length) ? `All data was added to DB successfuly` : `ERROR: ${data.length - COUNTER} missing pieces of data`
      console.log(colors.red.bold(`\n${MESSAGE}\n`))
    })
  })
})
