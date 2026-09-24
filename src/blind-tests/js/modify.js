const params = new URLSearchParams(window.location.search);
const id = params.get('id');
let lastRound = 0;

if (document.getElementById('addRound')){
  document.getElementById('addRound').addEventListener('click', addRound);
}
async function getTest(){
  const blindTest = await window.api.getBlindTest(id);
  document.getElementById('h1').textContent = blindTest[0].title
  document.getElementById('title').value = blindTest[0].title
  document.getElementById('d_day').value = blindTest[0].d_day
  let rounds = ''
  blindTest.forEach(round => {
    rounds += `<tr><td>${round.order}</td><td>${round.name}</td><td>${round.points}</td><td><button class="btn">Modifier</button></td></tr>`
    lastRound = round.order
  });
  document.getElementById('rounds').innerHTML = rounds
}

getTest()

function addRound() {
  window.location.href = `../rounds/add-round.html?action=add&id=${id}&order=${lastRound+1}`;
}


function modifyRound() {
  // Get round id
  window.location.href = `../rounds/add-round.html?action=modify&id=${id}`;
}