const base = parseInt(document.getElementById('base').innerHTML)
const content1 = parseInt(document.getElementById('content1').innerHTML)
const content2 = parseInt(document.getElementById('content2').innerHTML)
const content3 = parseInt(document.getElementById('content3').innerHTML)
const campaigns1 = parseInt(document.getElementById('campaigns1').innerHTML)
const campaigns2 = parseInt(document.getElementById('campaigns2').innerHTML)
const campaigns3 = parseInt(document.getElementById('campaigns3').innerHTML)
const blogs1 = parseInt(document.getElementById('blogs1').innerHTML)
const blogs2 = parseInt(document.getElementById('blogs2').innerHTML)
const blogs3 = parseInt(document.getElementById('blogs3').innerHTML)
const option1 = parseInt(document.getElementById('option1').innerHTML)
const option2 = parseInt(document.getElementById('option2').innerHTML)
const option3 = parseInt(document.getElementById('option3').innerHTML)
const items = document.querySelectorAll('.row.input');
const header = document.querySelector('.table .header');
items.forEach(item => {
    item.id = item.firstElementChild.innerHTML.trim().replaceAll(' ', '-').toLowerCase().slice(0,8)
}  )

const inputs = document.querySelectorAll('.wrapper input')


inputs.forEach((item) => {
    item.addEventListener("click", function(){
        calculateAll()
    })
})


function calculateCost(str,int){
  amt = base
  for(i=0; i<7; ++i){
    console.log(amt)
    if(items[i].querySelector('.'+str).children[0]){
        if(i == 1){
            amt += items[i].querySelector('.'+str).children[0].value * campaigns
        } else {
            amt += items[i].querySelector('.'+str).children[0].value * content
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
    calculateCost('first', option1)
    calculateCost('second', option2)
    calculateCost('third', option3)
    applyDiscounts()    
}

