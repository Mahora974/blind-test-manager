const params = new URLSearchParams(window.location.search);
const action = params.get('action');
const id = params.get('id');
const order = params.get('order');
let lastRound = 0;

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
    round.forEach(extract => {
      document.getElementById('songs').innerHTML  += `
    <tr>
      <td>
        <form id="addExtractForm${extract.extract_id}" name="addExtractForm${extract.extract_id}"></form>
        <input form="addExtractForm${extract.extract_id}" id="order_${extract.extract_id}" value="${Number(extract.extract_order)}" type="number"/>
      </td>
      <td>
        <input form="addExtractForm${extract.extract_id}" id="file_track_${extract.extract_id}" value="${extract.file_track}" type="text"/>
      </td>
      <td>
        <input class="btn" form="addExtractForm${extract.extract_id}" type="submit" value="Modifier"/>
        <button class="btn btn-circle" id="play_${extract.extract_id}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free v7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M91.2 36.9c-12.4-6.8-27.4-6.5-39.6 .7S32 57.9 32 72l0 368c0 14.1 7.5 27.2 19.6 34.4s27.2 7.5 39.6 .7l336-184c12.8-7 20.8-20.5 20.8-35.1s-8-28.1-20.8-35.1l-336-184z"/></svg></button>
      </td>
    </tr>`
      lastExtract = extract.order
      document.getElementById(`addExtractForm${extract.extract_id}`).addEventListener('submit', modifyExtract);
      document.getElementById(`play_${extract.extract_id}`).addEventListener('click', () => play(extract.file_track));
    });
  }
}

getRound()

if (document.getElementById('createRoundForm')){
  document.getElementById('createRoundForm').addEventListener('submit', addRound);
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

async function modifyExtract(event) {
  event.preventDefault();
  let id = event.target.id.substr(event.target.id.length - 1)
  let order = document.getElementById(`order_${id}`).value;
  let file_track = document.getElementById(`file_track_${id}`).value;
  await window.api.modifyExtract(id, order, file_track)
  window.location.href = `add-round.html?action=modify&id=${round_id}`;

}

function play(file_track) {
  Play.toggle(file_track)
}