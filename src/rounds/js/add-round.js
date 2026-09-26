const params = new URLSearchParams(window.location.search);
const action = params.get('action');
const id = params.get('id');
const order = params.get('order');
let lastRound = 0;

if (document.getElementById('createRoundForm')){
  document.getElementById('createRoundForm').addEventListener('submit', addRound);
}
async function getRound(){
  const categories = await window.api.getCategories();
  let options = ''
  categories.forEach(category => {
    options += `<option value="${category.id}"> ${category.name}</option>`
  });
  document.getElementById('category_id').innerHTML = options
  const round = await window.api.getRound(id);
  let extracts = ''
  round.forEach(extract => {
    extracts += `<tr><td>${extract.order}</td><td>${extract.file_track}</td><td><button class="btn">Modifier</button></td></tr>`
    lastExtract = extract.order
  });
  document.getElementById('songs').innerHTML = extracts
  if (action == "add"){
    document.getElementById('order').value = Number(order)
  } else if (action == "modify") {
    const round = await window.api.getRound(id);
    document.getElementById('category').value = round[0].name
    document.getElementById('order').value = round[0].order
    document.getElementById('points').value = round[0].points
    document.getElementById('answer').value = round[0].answer
    let rounds = ''
    blindTest.forEach(round => {
      rounds += `<tr><td>${round.order}</td><td>${round.name}</td><td>${round.points}</td><td><button class="btn">Modifier</button></td></tr>`
    });
    lastRound = round.order
    document.getElementById('rounds').innerHTML = rounds
  }
}

getRound()

if (document.getElementById('createForm')){
  document.getElementById('createForm').addEventListener('submit', sendCreateForm);
}

async function addRound(event) {
  event.preventDefault();
  let category_id = document.getElementById("category_id").value;
  let order = document.getElementById("order").value;
  let answer = document.getElementById("answer").value;
  let points = document.getElementById("points").value;
  if (action == "add") {
    await window.api.addRound(order, answer, points, category_id, id)
  }
}