const items = document.querySelectorAll('.row.option');
const header = document.querySelector('.table .header');
const trashbin = document.querySelector('.trashbin .header');

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
  calculateCost()
  applyDiscounts()
  createAllDropZones()
}

function dragEnd(e){
  e.target.classList.remove('chosen')
}
function calculateCost(){
  base = 10000
  itemnum = document.querySelectorAll('.table .row.option').length
  cost1 = Math.round(base + (itemnum * 1833.33))
  document.querySelector('.totals.cost .first').innerText = "$"+cost1
  cost2 = Math.round(base + (itemnum * 2500))
  document.querySelector('.totals.cost .second').innerText = "$"+cost2
  cost3 = Math.round(base + (itemnum * 4166.66))
  document.querySelector('.totals.cost .third').innerText = "$"+cost3
}
calculateCost()
 function applyDiscounts(){
  first = parseInt(document.querySelector('.totals.cost .first').innerText.slice(1,))/100
  firstdiscount1 = Math.round(first*.945)*100
  firstdiscount2 = Math.round(first*.855)*100
  document.querySelector('.totals.discount1 .first').innerText = "$"+firstdiscount1
  document.querySelector('.totals.discount2 .first').innerText = "$"+firstdiscount2
  second = parseInt(document.querySelector('.totals.cost .second').innerText.slice(1,))/100
  seconddiscount1 = Math.round(second*.94)*100
  seconddiscount2 = Math.round(second*.88)*100
  document.querySelector('.totals.discount1 .second').innerText = "$"+seconddiscount1
  document.querySelector('.totals.discount2 .second').innerText = "$"+seconddiscount2
  third = parseInt(document.querySelector('.totals.cost .third').innerText.slice(1,))/100
  thirddiscount1 = Math.round(third*.929)*100
  thirddiscount2 = Math.round(third*.857)*100
  document.querySelector('.totals.discount1 .third').innerText = "$"+thirddiscount1
  document.querySelector('.totals.discount2 .third').innerText = "$"+thirddiscount2
 }
applyDiscounts()
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


