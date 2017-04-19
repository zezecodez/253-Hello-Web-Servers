let updatePreview = () => {
  let editorInput = document.getElementById('editor').value
  let markdown = marked(editorInput)
  document.querySelector('.preview').innerHTML = markdown
}

let save = () => {
  let editorInput = document.getElementById('editor').value
  fetch('/save', {
    method: 'post',
    headers: {
      'Content-Type': 'text/plain'
    },
    body: editorInput
  })
  .then((response) => {
    return response.text()
  })
  .then(console.log)
  .catch(console.log)
}

let load = () => {
  fetch('/load', {
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
  load()
}
