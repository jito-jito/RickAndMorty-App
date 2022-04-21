const express = require('express')
const app = express()
const port = 5000


app.get('/', function(req, res) {
  res.send("hello express")
})

app.listen(port, () => {
  console.log(`app running in port http://localhost:${port}/`)
})