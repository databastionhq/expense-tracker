const API_URL = "https://script.google.com/macros/s/AKfycbzc9MBVbj0ZmgTcn1f_Fwl1oR78rXSnp-wCD0u9QN6Y_XjESlXX-47o7VNgB4Bx-RzRLQ/exec";

function save() {
  const amount = document.getElementById("amount").value;
  const type = document.getElementById("type").value;
  const category = document.getElementById("category").value;
  const note = document.getElementById("note").value;

  if (!amount) {
    alert("Enter amount");
    return;
  }

  fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({
      amount: amount,
      type: type,
      category: category,
      note: note
    })
  })
  .then(() => {
    alert("Saved");
    document.getElementById("amount").value = "";
    document.getElementById("note").value = "";
  })
  .catch(() => {
    alert("Error saving data");
  });
}
