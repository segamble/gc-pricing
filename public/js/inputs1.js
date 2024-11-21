const base = parseInt(document.getElementById('base').innerHTML)
const content = [parseInt(document.getElementById('content1').innerHTML),parseInt(document.getElementById('content2').innerHTML),parseInt(document.getElementById('content3').innerHTML)]
const campaigns = [parseInt(document.getElementById('campaigns1').innerHTML),parseInt(document.getElementById('campaigns2').innerHTML),parseInt(document.getElementById('campaigns3').innerHTML)]
const blogs = [parseInt(document.getElementById('blogs1').innerHTML),parseInt(document.getElementById('blogs2').innerHTML),parseInt(document.getElementById('blogs3').innerHTML)]
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

function calcAddCost(i, str, x){
    number = items[i].querySelector('.'+str).children[0].value
    if(number > 2){
        addCost = x[0] + x[1] + (x[2]*(number-2))
    } else if(number == 2){
        addCost = x[0] + x[1]
    } else {
        addCost = number * x[0]
    }
    return addCost

}

function calculateCost(str,int){
  term = document.querySelector('input[name=term]:checked').value
  amt = base
  for(i=0; i<7; ++i){
    console.log(amt)
    if(items[i].querySelector('.'+str).children[0]){
        if(i == 0){
            amt += calcAddCost(i,str,content)
        } else if(i == 1){
            amt += calcAddCost(i,str,campaigns)
        } else if(i == 4){
            amt += calcAddCost(i,str,blogs)
        } else {
            inputName = items[i].querySelector('.'+str).children[0].firstChild.name
            amt += int * document.querySelector('input[name='+inputName+']:checked').value
        }
        
    } else {
        amt += int
    }
  }
  amt *= term
    amt= Math.round(amt)
  document.querySelector('.totals.cost .'+str).innerText = "$"+amt
}
calculateAll()

function calculateAll(){
    calculateCost('first', option1)
    calculateCost('second', option2)
    calculateCost('third', option3)  
}

