const express = require('express')
const {MapRouter} = require('../dist/index')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(MapRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})