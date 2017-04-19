const express = require('express')
const bodyParser = require('body-parser')
const http = require('http')
const pug = require('pug')
const fs = require('fs')

const app = express()
const port = 3000

app.use(bodyParser.text())
app.set('view engine', 'pug')
app.set('views','views')

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('Index')
})

app.post('/save', (req, res) => {
 let writeStream = fs.createWriteStream('data/MARKDOWN.md')
 writeStream.write(req.body)
 writeStream.end()
})

app.get('/load', (req, res) => {
   let str = ''
  let readStream = fs.createReadStream('data/MARKDOWN.md')
  readStream.on('data', (chunk) => {
    str += chunk
  }).on('end', () => {
      res.send(str)
  })
})

app.listen(port, () => {
  console.log('Listening on port ' + port)
})
