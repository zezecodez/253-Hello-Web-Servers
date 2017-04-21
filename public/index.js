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
  if (fileName == '/READONLY.md') {
    document.getElementById('editor').setAttribute('readonly', true)
  }
  return fileName.match(/\/(.*)/)[1]
}

let newFile = () => {
  let newFileName = prompt('Enter file name')
  if(!newFileName.match(/.md/))
    newFileName += ".md";
  fetch('newFile/?fileName=' + newFileName, {
    method: 'get',
    headers: {
      "Content-Type": "text/plain"
    }
  })
  .then((response) => {
      return response.text()
  })
  .then((response) => {
    if(response == '1') {
      let li = document.createElement("li");
      li.innerHTML = '<a href="' + newFileName + '"> ' + newFileName + '</a>' +
      '<a href="/actions/delete?fileName=' + newFileName +
      '"><i class="fa fa-trash"> </i></a>';
      document.querySelector(".file-tree").appendChild(li);
    }
  })
}

let save = () => {
  let editorInput = document.getElementById('editor').value
  fetch('/save?fileName=' + getFile(), {
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
    document.cookie = "lastEdited=" + getFile()
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
  document.getElementById('new-file').addEventListener('click', newFile)
}
