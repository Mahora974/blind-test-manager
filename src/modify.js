const params = new URLSearchParams(window.location.search);
const id = params.get('id');

async function getTest(){
  const blindTest = await window.api.getBlindTest(id);
  document.getElementById('title').textContent = blindTest[0].title
  let rounds = ''
  blindTest.forEach(round => {
    rounds += `<tr><td>${round.order}</td><td>${round.name}</td><td>${round.points}</td><td><button class="btn">Modifier</button></td></tr>`
  });
  document.getElementById('rounds').innerHTML = rounds
  console.log(document.getElementById('rounds'))
}

getTest()
