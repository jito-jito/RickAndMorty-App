const { config } = require('./config')
const app = require('./app')

app.listen(config.port, () => {
  console.log(`app running in port http://localhost:${config.port}/`)
})
