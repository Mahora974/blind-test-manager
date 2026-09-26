const params = new URLSearchParams(window.location.search);
const id = params.get('id');
let lastRound = 0;

if (document.getElementById('addRound')){
  document.getElementById('addRound').addEventListener('click', addRound);
}

if (document.getElementById('modifyForm')){
  document.getElementById('modifyForm').addEventListener('submit', modifyBlindTest);
}
async function getTest(){
  const blindTest = await window.api.getBlindTest(id);
  document.getElementById('h1').textContent = blindTest[0].title
  document.getElementById('title').value = blindTest[0].title
  let date = new Date(blindTest[0].d_day)
  const offset = date.getTimezoneOffset()
  date = new Date(date.getTime() - (offset*60*1000))
  document.getElementById('d_day').value = date.toISOString().split('T')[0]
  let rounds = ''
  blindTest.forEach(round => {
    rounds += `<tr><td>${round.order}</td><td>${round.name}</td><td>${round.points}</td><td><a href="../rounds/add-round.html?action=modify&id=${round.id}"><button class="btn">Modifier</button></a></td></tr>`
    lastRound = round.order
  });
  document.getElementById('rounds').innerHTML = rounds
}

getTest()

async function modifyBlindTest() {
  event.preventDefault();
  let title = document.getElementById("title").value;
  let d_day = document.getElementById("d_day").value;
  try {
    await window.api.modifyBlindTest(id, title, d_day);
    window.location.href = `modify.html?id=${id}`;
  } catch (error) {
    throw new Error(error);
  }
}

function addRound() {
  window.location.href = `../rounds/add-round.html?action=add&id=${id}&order=${lastRound+1}`;
}

