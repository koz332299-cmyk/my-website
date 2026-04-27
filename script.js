const months = [
  "يناير","فبراير","مارس","أبريل","مايو","يونيو",
  "يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر"
];

const people = [
  "منصور","يزيد","خالد","محمد",
  "عمر","عبود","خالد ع","عزوز ش",
  "عزوز م"
];

const monthsRow = document.getElementById("monthsRow");
const tableBody = document.getElementById("tableBody");

/* إضافة الأشهر */
months.forEach(month => {
  const th = document.createElement("th");
  th.textContent = month;
  monthsRow.appendChild(th);
});
window.isAdmin = false;

async function buildTable() {

  for (let i = 0; i < people.length; i++) {
    const tr = document.createElement("tr");

    const nameTd = document.createElement("td");
    nameTd.textContent = people[i];
    tr.appendChild(nameTd);

    for (let j = 0; j < months.length; j++) {
      const td = document.createElement("td");
      const cb = document.createElement("input");
      cb.type = "checkbox";

      const key = `qata_${i}_${j}`;

      try {
        const docSnap = await getDoc(doc(db, "qata", key));

        if (docSnap.exists()) {
          cb.checked = docSnap.data().checked;
        }
      } catch (e) {
        console.log("خطأ:", e);
      }

      // منع التعديل لغير الأدمن
      cb.addEventListener("click", (e) => {
        if (!window.isAdmin) {
          e.preventDefault();
          alert("❌ فقط الأدمن");
        }
      });

      // حفظ البيانات
      cb.addEventListener("change", async () => {
        if (!window.isAdmin) {
          await setDoc(doc(db, "qata", key), {
            checked: cb.checked
          });
        }
      });

      td.appendChild(cb);
      tr.appendChild(td);
    }

    tableBody.appendChild(tr);
  }
}

// تشغيل
buildTable();


/*الخلفيه*/
