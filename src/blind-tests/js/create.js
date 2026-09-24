if (document.getElementById('createForm')){
  document.getElementById('createForm').addEventListener('submit', sendCreateForm);
}

async function sendCreateForm(event) {
  event.preventDefault();
  let title = document.getElementById("title").value;
  let d_day = document.getElementById("d_day").value;
  try {
    id = await window.api.addBlindTest(title, d_day);
    window.location.href = `modify.html?id=${id}`;
  } catch (error) {
    throw new Error(error);
  }
}