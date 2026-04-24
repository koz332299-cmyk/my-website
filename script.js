const months = [
  "يناير", "فبراير", "مارس", "أبريل",
  "مايو", "يونيو", "يوليو", "أغسطس",
  "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
];

const people = [
  "منصور", "يزيد", "خالد", "عمر",
  "عبود", "محمد", "خالد", "عبدالعزيز"
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
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    const key = `qata_${i}_${j}`;

    checkbox.checked = localStorage.getItem(key) === "true";

    checkbox.addEventListener("change", () => {
      localStorage.setItem(key, checkbox.checked);
    });

    td.appendChild(checkbox);
    tr.appendChild(td);
  });

  tableBody.appendChild(tr);
});