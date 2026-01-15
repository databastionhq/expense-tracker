console.log("NEW APP.JS LOADED");
const API_URL = "https://script.google.com/macros/s/AKfycbwlYOJ4RsGxB3AChK45l8BJ3Ro7toeyBUv7EANcDOqnQz_0eAYEHdzHb6kpFnRWGtBG3g/exec?v=" + Date.now();

function showTab(tab) {
  document.getElementById("transaction").classList.remove("active");
  document.getElementById("categoryTab").classList.remove("active");

  if (tab === "transaction") {
    document.getElementById("transaction").classList.add("active");
  } else {
    document.getElementById("categoryTab").classList.add("active");
  }
}

function loadCategories() {
  fetch(API_URL)
    .then(res => res.json())
    .then(categories => {
      const select = document.getElementById("category");
      select.innerHTML = "";

      categories.forEach(cat => {
        const opt = document.createElement("option");
        opt.textContent = cat;
        select.appendChild(opt);
      });
    });
}

function saveTransaction() {
  fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({
      action: "addTransaction",
      amount: amount.value,
      type: type.value,
      category: category.value,
      note: note.value
    })
  }).then(() => {
    alert("Saved");
    amount.value = "";
    note.value = "";
  });
}

function saveCategory() {
  const cat = document.getElementById("newCategory").value;
  if (!cat) return alert("Enter category");

  fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({
      action: "addCategory",
      category: cat
    })
  }).then(() => {
    alert("Category added");
    document.getElementById("newCategory").value = "";
    loadCategories();
  });
}

function showTab(tab) {
  document.getElementById("transaction").classList.remove("active");
  document.getElementById("categoryTab").classList.remove("active");
  document.getElementById("chartsTab").classList.remove("active");

  if (tab === "transaction") {
    document.getElementById("transaction").classList.add("active");
  } else if (tab === "category") {
    document.getElementById("categoryTab").classList.add("active");
  } else {
    document.getElementById("chartsTab").classList.add("active");
  }
}

function testSummary() {
  fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({ action: "getSummary" })
  })
    .then(res => res.text())
    .then(data => {
      document.getElementById("summaryOutput").textContent = data;
    });
}

loadCategories();
