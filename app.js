const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const http = require('http')
const pug = require('pug')
const fs = require('fs')

const app = express()
const port = 3000

app.use(bodyParser.text())
app.use(cookieParser())
app.set('view engine', 'pug')
app.set('views','views')

app.use(express.static('public'))

app.post('/save', (req, res) => {
 console.log(req.query.fileName);
 let writeStream = fs.createWriteStream('./data/' + req.query.fileName)
 writeStream.write(req.body)
 writeStream.end()
 res.send('1')
})

app.get('/load', (req, res) => {
  let str = ''
  let fileName = req.query.fileName
  let readStream = fs.createReadStream('data/' + fileName)
  readStream.on('data', (chunk) => {
    str += chunk
  }).on('end', () => {
      res.send(str)
  }).on('error', (error) => {
    res.send('Error! File not found.')
  })
})

app.get('/newFile', (req, res) => {
  let fileName = req.query.fileName
  let writeStream = fs.createWriteStream('./data/' + fileName)
  writeStream.write(' ')
  writeStream.end()
  res.send('1')
})

app.get('/deleteFile', (req, res) =>{
  let fileName = req.query.fileName
  if (fileName != 'READONLY.md') {
    fs.unlinkSync('./data/' + fileName)
  }
  res.redirect('/')
})

app.get('*', (req,res) => {
  if (req.url == '/') {
    if (req.cookies.lastEdited !== undefined) {
      res.redirect('/' + req.cookies.lastEdited)
    } else {
      res.redirect('READONLY.md')
    }
  } else {
    fs.readdir('./data/', (error, files) => {
      res.render('index', {
        fileName: req.url,
        listOfFiles: files
      })
    })
  }
})

app.listen(port, () => {
  console.log('Listening on port ' + port)
})
