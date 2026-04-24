const months = [
  "يناير","فبراير","مارس","أبريل","مايو","يونيو",
  "يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر"
];

const people = [
  "شخص 1","شخص 2","شخص 3","شخص 4",
  "شخص 5","شخص 6","شخص 7","شخص 8"
];

const authBox = document.getElementById("authBox");
const registerBox = document.getElementById("registerBox");
const mainApp = document.getElementById("mainApp");

function showRegister() {
  authBox.classList.add("hidden");
  registerBox.classList.remove("hidden");
}

function showLogin() {
  registerBox.classList.add("hidden");
  authBox.classList.remove("hidden");
}

/* تسجيل جديد */
function register() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("newEmail").value;
  const password = document.getElementById("newPassword").value;

  localStorage.setItem("user", JSON.stringify({ name, email, password }));
  alert("تم إنشاء الحساب");
  showLogin();
}

/* تسجيل دخول */
function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.email === email && user.password === password) {
    localStorage.setItem("loggedIn", "true");
    loadApp();
  } else {
    alert("بيانات خاطئة");
  }
}

/* تسجيل خروج */
function logout() {
  localStorage.removeItem("loggedIn");
  location.reload();
}

/* تحميل التطبيق */
function loadApp() {
  authBox.classList.add("hidden");
  registerBox.classList.add("hidden");
  mainApp.classList.remove("hidden");

  const monthsRow = document.getElementById("monthsRow");
  const tableBody = document.getElementById("tableBody");

  months.forEach(m => {
    const th = document.createElement("th");
    th.textContent = m;
    monthsRow.appendChild(th);
  });

  people.forEach((p, i) => {
    const tr = document.createElement("tr");

    const tdName = document.createElement("td");
    tdName.textContent = p;
    tr.appendChild(tdName);

    months.forEach((m, j) => {
      const td = document.createElement("td");
      const cb = document.createElement("input");
      cb.type = "checkbox";

      const key = `check_${i}_${j}`;
      cb.checked = localStorage.getItem(key) === "true";

      cb.onchange = () => {
        localStorage.setItem(key, cb.checked);
      };

      td.appendChild(cb);
      tr.appendChild(td);
    });

    tableBody.appendChild(tr);
  });
}

/* دخول تلقائي */
if (localStorage.getItem("loggedIn") === "true") {
  loadApp();
}