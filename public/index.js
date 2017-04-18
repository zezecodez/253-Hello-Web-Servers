
// parser function
var markedFile = function() {
 return marked(document.getElementById('editor').value);
}
function save() {
  return 'inside save'
  //does saving
}

// document.querySelector('.preview-data').innerHTML = markedFile;
window.onload = function () {
  // document.querySelector('btn-class').addEventListener('click', save)
  // document.querySelector('editor').addEventListener('input', markedFile)
}
//get dom element

//respond dom update
// document.getElementById('editor').innerHTML = 'inside js file'

console.log(document.querySelector('btn-class'));
