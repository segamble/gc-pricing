

const items = document.querySelectorAll('.row.input');
const header = document.querySelector('.table .header');
items.forEach(item => {
    item.id = item.firstElementChild.innerHTML.trim().replaceAll(' ', '-').toLowerCase().slice(0,8)
}  )

const inputs = document.querySelectorAll('.table input')


inputs.forEach((item) => {
    item.addEventListener("click", function(){
        calculateAll()
    })
})


function calculateCost(str,int){
    base = 10000
  amt = base
  for(i=0; i<7; ++i){
    if(items[i].querySelector('.'+str).children[0]){
        if(i == 0){
            amt += items[i].querySelector('.'+str).children[0].value * 229
        } else if(i == 1){
            amt += items[i].querySelector('.'+str).children[0].value * 460
        }  
    } else {
        amt += int
    }
    amt= Math.round(amt)
  }
  document.querySelector('.totals.cost .'+str).innerText = "$"+amt
}

calculateAll()
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


function calculateAll(){
    calculateCost('first', 1834)
    calculateCost('second', 2500)
    calculateCost('third', 4166)
    applyDiscounts()    
}

