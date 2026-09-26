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
    options += `<option id="category_${category.id}" value="${category.id}"> ${category.name}</option>`
  });
  document.getElementById('category_id').innerHTML = options
  if (action == "add"){
    document.getElementById('order').value = Number(order)
  } else if (action == "modify") {
    const round = await window.api.getRound(id);
    document.getElementById(`category_${round[0].category_id}`).selected = true
    document.getElementById('order').value = Number(round[0].round_order)
    document.getElementById('points').value = Number(round[0].round_points)
    document.getElementById('answer').value = round[0].answer
    let extracts = ''
    round.forEach(extract => {
      extracts += `<tr><td>${extract.extract_order}</td><td>${extract.file_track}</td><td><button class="btn">Modifier</button></td></tr>`
      lastExtract = extract.order
    });
    document.getElementById('songs').innerHTML = extracts
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
    let round_id = await window.api.addRound(order, answer, points, category_id, id)
    window.location.href = `add-round.html?action=modify&id=${round_id}`;
  } else if (action == "modify") {
    await window.api.modifyRound(id, order, answer, points, category_id)
    window.location.href = `add-round.html?action=modify&id=${round_id}`;
  }
}