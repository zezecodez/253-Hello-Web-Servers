let countWords = (string) => {
  let words = string
    .replace(/[^a-zA-Z0-9\s]/g, '')
    .replace(/[\s]{2,}/g, ' ')
    .replace(/^\s/g, '')
    .replace(/\n/g, ' ')
    .replace(/\s\s/g, ' ')
    .replace(/\s$/g, '')
    .split(' ')
  if(words.length == 1 && words[0] == '')
    return 0;
  return words.length;
}

let updatePreview = () => {
  let editorInput = document.getElementById("editor").value
  let markdown = marked(editorInput)
  document.querySelector(".preview").innerHTML = markdown
  document.getElementById("words").innerHTML = countWords(editorInput)
}

const getFile = () => {
  let fileName = window.location.pathname
  if (fileName == '/EXAMPLEFILE.md') {
    document.getElementById('editor').setAttribute('readonly', true)
  }
  return fileName.match(/\/(.*)/)[1]
}

let save = (file) => {
  let editorInput = document.getElementById('editor').value
  fetch('/save?fileName=' + file, {
    method: 'post',
    headers: {
      'Content-Type': 'text/plain'
    },
    body: editorInput
  })
  .then((response) => {
    return response.text()
  })
  .then((response) => {
    document.cookie = "lastEdited=" + file
  })
  .catch(console.log)
}

let load = (file) => {
  fetch('/load?fileName=' + file, {
    method: 'get',
    headers: {
      'Content-Type': 'text/plain'
    }
  })
  .then((response) => {
      return response.text()
  })
  .then((response) => {
    document.getElementById('editor').value = response
    updatePreview()
  })
}

window.onload = () => {
  document.getElementById('editor').addEventListener('input', updatePreview)
  document.getElementById('save').addEventListener('click', save)
  load(getFile())
  // document.getElementById('new-file').addEventListener('click', newFile)
}
