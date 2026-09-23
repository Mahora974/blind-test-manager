async function getTests() {
  let options = document.getElementById('tests').getHTML()
  const blindTests = await window.api.getBlindTests();
  blindTests.forEach(blindTest => {
    let day = new Date(blindTest.d_day)
    options += `<option value="${blindTest.id}"> ${blindTest.title} (${day.toLocaleDateString()})</option>`;
  });
  document.getElementById('tests').innerHTML = options
}

if (document.getElementById('tests')){
  getTests()
}


if (document.getElementById('selectModifyForm')){
  document.getElementById('selectModifyForm').addEventListener('submit', sendSelectModifyForm);
}

async function sendSelectModifyForm(event) {
  event.preventDefault();
  let id = document.getElementById("tests").value;
  window.location.href = `modify.html?id=${id}`;
}