const months = [
  "يناير","فبراير","مارس","أبريل","مايو","يونيو",
  "يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر"
];

const people = [
  "شخص 1","شخص 2","شخص 3","شخص 4",
  "شخص 5","شخص 6","شخص 7","شخص 8",
  "شخص 9"
];

const monthsRow = document.getElementById("monthsRow");
const tableBody = document.getElementById("tableBody");

/* إضافة الأشهر */
months.forEach(month => {
  const th = document.createElement("th");
  th.textContent = month;
  monthsRow.appendChild(th);
});

/* إنشاء الجدول */
people.forEach((person, i) => {
  const tr = document.createElement("tr");

  const nameTd = document.createElement("td");
  nameTd.textContent = person;
  tr.appendChild(nameTd);

  months.forEach((m, j) => {
    const td = document.createElement("td");
    const cb = document.createElement("input");
    cb.type = "checkbox";

    const key = `qata_${i}_${j}`;
    cb.checked = localStorage.getItem(key) === "true";

    cb.addEventListener("change", () => {
      localStorage.setItem(key, cb.checked);
    });

    td.appendChild(cb);
    tr.appendChild(td);
  });

  tableBody.appendChild(tr);
});