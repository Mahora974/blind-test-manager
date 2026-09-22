document.getElementById('createForm').addEventListener('submit', sendCreateForm);

function sendCreateForm(event) {
  event.preventDefault();
  let title = document.getElementById("title").value;
  let d_day = document.getElementById("d_day").value;
  window.api.addBlindTest(title, d_day);
}