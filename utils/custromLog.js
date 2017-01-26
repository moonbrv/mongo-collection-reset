import colors from 'colors'

const DEFAULT_COLOR = 'white'

export default function createLogger() {
  const NODE_ENV = process.env.NODE_ENV
  const DEV = (NODE_ENV === 'development')
  function log(msg = '', col = DEFAULT_COLOR) {
    if (!colors[col]) {
      col = DEFAULT_COLOR
    }
    if (DEV) {
      console.log(colors[col].bold(`-->   ${msg}`))
    }
  }
  return log
}
