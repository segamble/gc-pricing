const items = document.querySelectorAll('.row');
const header = document.querySelector('.table .header');
const trashbin = document.querySelector('.trashbin .header');
// const tips = document.querySelectorAll('.walkthru li');
let names = document.querySelector('.row').children
const cats = []
for(i=1;i<names.length;++i){
  cats.push(names[i].classList[0])
}
//make each row draggable and create map of original score values
const itemScores = new Map()
items.forEach(item => {
  item.draggable = 'true';
  item.id = item.firstElementChild.innerHTML.trim().replaceAll(' ', '-').toLowerCase()
  item.addEventListener('dragstart', dragStart);
  item.addEventListener('dragend', dragEnd);
  //create map of original score values
  catScores = new Map()
  cats.forEach(element => {
    let x = "."+element;
    score = parseInt(item.querySelector(x).innerHTML)
    catScores.set(element,score)
    // item.querySelector(x).innerHTML = replaceScores(score)
    // item.querySelector(x).classList.add(replaceScores(score))
  })
  itemScores.set(item.id,catScores)
})


// //calculate initial scoring
// recalculate()

//create dropzones
createAllDropZones()


function createDropZone(){
  const dropzone = document.createElement('div')
  dropzone.classList.add('drop-container')
  return dropzone;
}
function createAllDropZones(){
  items.forEach(item => {
    let dropzone = createDropZone()
    item.parentElement.after(dropzone)
  })
  let dropzone = createDropZone()
  header.after(dropzone)
  let trashzone = createDropZone()
  trashbin.after(trashzone)
  const boxes = document.querySelectorAll('.drop-container');
  boxes.forEach(box => {
    box.addEventListener('dragenter', dragEnter);
    box.addEventListener('dragover', dragOver);
    box.addEventListener('dragleave', dragLeave);
    box.addEventListener('drop', drop);
})
}
function removeDropZones(){
  boxes = document.querySelectorAll('.drop-container');
  boxes.forEach(box => {
    box.remove()
})
}

function dragStart(e) {
  e.dataTransfer.setData('text/plain', e.target.id)
  e.target.style.cursor = "move";
  e.target.classList.add('chosen')
}

function dragEnter(e){
  e.preventDefault();
  //add if clause to prevent dropping in a row
  if(e.target.draggable != true){
    e.target.classList.add('drag-over')
  }
}

function dragOver(e){
//add if clause to prevent dropping in a row
  if(e.target.draggable != true){
    e.preventDefault();
    e.target.classList.add('drag-over')
  } 
}

function dragLeave(e){
  e.target.classList.remove('drag-over')
}

function drop(e){
  const id = e.dataTransfer.getData('text/plain');
  const draggable = document.getElementById(id);
  e.target.classList.remove('drag-over')
  e.target.classList.add('container')
  e.target.appendChild(draggable);
  e.target.classList.remove('drop-container')
  e.target.classList.add('container')
  removeDropZones()
//   recalculate()
  createAllDropZones()
}

function dragEnd(e){
  e.target.classList.remove('chosen')
}

// // function getScores(item, rank){
// //   cats.forEach(element => {
// //     let x = "."+element;
// //     score = itemScores.get(item.id).get(element)
// //     score *= rank;
// //     item.querySelector(x).innerHTML = score
// //   })
// // }

// function totalScores(rows){
//   cats.forEach(element => {
//     let total = 0
//     for(i=0; i<rows.length; ++i){
//       // console.log(itemScores.get(rows[i].id).get(element))
//       let score = itemScores.get(rows[i].id).get(element) * (i+1)
//       total += score
//     }
//     // rows.forEach(row =>{
//     //   let score = parseInt(row.querySelector("."+element).innerHTML) * parseInt(row.querySelector(".weight").innerHTML)
//     //   total += score
//     // })
//     document.querySelector('.totals').querySelector("."+element).innerHTML = total
//   })
  
// }

// function resetTrashbin(){
//   let rows = document.querySelectorAll('.trashbin .row')
//   rows.forEach(row => {
//     getScores(row,1)
//   })
// }

function recalculate(){
  let rows = document.querySelectorAll('.table .row');
  // for(i=0; i<rows.length; ++i){
  //   // let rank = Math.abs(i - 10)
  //   rows[i].querySelector('.weight').innerHTML = Math.abs(i - 10)
  // }
  totalScores(rows)
  // document.querySelector('.totals').querySelector(".weight").innerHTML = ""
  // resetTrashbin()
}


