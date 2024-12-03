const base = parseInt(document.getElementById('base').innerHTML)
const content = [parseInt(document.getElementById('content1').innerHTML),parseInt(document.getElementById('content2').innerHTML),parseInt(document.getElementById('content3').innerHTML)]
const campaigns = [parseInt(document.getElementById('campaigns1').innerHTML),parseInt(document.getElementById('campaigns2').innerHTML),parseInt(document.getElementById('campaigns3').innerHTML)]
const blogs = [parseInt(document.getElementById('blogs1').innerHTML),parseInt(document.getElementById('blogs2').innerHTML),parseInt(document.getElementById('blogs3').innerHTML)]
const ln = parseInt(document.getElementById('ln').innerHTML)
const mops = parseInt(document.getElementById('mops').innerHTML)
const news = parseInt(document.getElementById('news').innerHTML)
const bdr = [parseInt(document.getElementById('bdr1').innerHTML),parseInt(document.getElementById('bdr2').innerHTML),parseInt(document.getElementById('bdr3').innerHTML)]
const items = document.querySelectorAll('.row.input');
const mqlcalc = {spend:parseFloat(document.getElementById('mqlsp').innerHTML),bdr:parseFloat(document.getElementById('mqlbdr').innerHTML),content:parseFloat(document.getElementById('mqlco').innerHTML),campaigns:parseFloat(document.getElementById('mqlca').innerHTML), personas:parseFloat(document.getElementById('mqlp').innerHTML), blogpost:parseFloat(document.getElementById('mqlb').innerHTML)}
const engcalc = {spend:parseFloat(document.getElementById('engs').innerHTML),bdr:parseFloat(document.getElementById('engbdr').innerHTML),nurture:parseFloat(document.getElementById('engl').innerHTML),mops:parseFloat(document.getElementById('engm').innerHTML), personas:parseFloat(document.getElementById('engp').innerHTML)}

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
function calculateNewsletters(personas){
    document.getElementById('newslett').children[1].innerHTML = personas*3
}
function calculateCost(){
  term = document.querySelector('input[name=term]:checked').value
  personas = document.getElementById('personas').value
  pmid = 'p'+personas
  pm = document.getElementById(pmid).innerHTML
  amt = base
  for(i=0; i<6; ++i){
    str="first"
    if(items[i].querySelector('.'+str).children[0]){
        if(i == 0){
            amt += calcAddCost(i,str,content)
        } else if(i == 1){
            amt += calcAddCost(i,str,campaigns)
        } else if(i == 4){
            amt += calcAddCost(i,str,blogs)
        } else {
            inputName = items[i].querySelector('.'+str).children[0].firstChild.name
            int = parseInt(document.getElementById(inputName).innerHTML)
            amt += int * document.querySelector('input[name='+inputName+']:checked').value
        }
        
    } else {
        int = news
        amt += int
    }
  }
  amt *= term
  amt *=pm
    amt= Math.round(amt)
    calcQuart(amt)
    moAmt = Math.round(amt/3).toLocaleString()
  document.querySelector('.totals.cost .'+str).innerText = "$"+amt.toLocaleString() +"\n($"+ moAmt +" per month)"
  document.querySelector('#services .first').innerHTML = "$"+amt.toLocaleString()
}
calculateAll()

function calculateAll(){
    calculateCost()
    calculateNewsletters(personas)
}

function calcQuart(amt){
    qCost = parseInt(amt)
    qCost += parseInt(document.querySelector('#media-bu input').value)
    number = parseInt(document.querySelector('#bdr-boos input').value)
    if(number > 2){
        addCost = bdr[0] + bdr[1] + (bdr[2]*(number-2))
    } else if(number == 2){
        addCost = bdr[0] + bdr[1]
    } else {
        addCost = number * bdr[0]
    }
    qCost += addCost
    document.getElementById('qcost').innerHTML = "$"+qCost.toLocaleString()
    calcResults()
}
function calcResults(){
    console.log(mqlcalc)
    mqls = 0
    mqls += mqlcalc['spend']*parseInt(document.querySelector('#media-bu input').value)
    console.log(mqls)
    mqls += mqlcalc['bdr']*parseInt(document.querySelector('#bdr-boos input').value)
    console.log(mqls)
    mqls *= (1+mqlcalc['content'])
    console.log(mqls)
    mqls *= (1+mqlcalc['campaigns'])
    console.log(mqls)
    mqls *= (mqlcalc['personas']*(parseInt(document.getElementById('personas').value)-1))
    console.log(mqls)
    mqls += (mqlcalc['blogpost']*parseInt(document.querySelector('#seo-opti input').value))+mqls
    console.log(mqls)
    document.querySelector('.mqls .first').innerHTML = Math.round(mqls)
}
