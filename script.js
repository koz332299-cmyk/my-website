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
        if (!isAdmin) {
          e.preventDefault();
          alert("❌ فقط الأدمن");
        }
      });

      // حفظ البيانات
      cb.addEventListener("change", async () => {
        if (isAdmin) {
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
const canvas = document.getElementById('shader-canvas');
const gl = canvas.getContext('webgl');

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
}
window.addEventListener('resize', resize);
resize();

function compileShader(gl, source, type) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  return shader;
}

const vertSrc = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragSrc = document.getElementById('fragShader').textContent;

const vertShader = compileShader(gl, vertSrc, gl.VERTEX_SHADER);
const fragShader = compileShader(gl, fragSrc, gl.FRAGMENT_SHADER);

const program = gl.createProgram();
gl.attachShader(program, vertShader);
gl.attachShader(program, fragShader);
gl.linkProgram(program);
gl.useProgram(program);

const posLoc = gl.getAttribLocation(program, 'position');
const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
  -1, -1, 1, -1, -1, 1,
  -1, 1, 1, -1, 1, 1,
]), gl.STATIC_DRAW);

gl.enableVertexAttribArray(posLoc);
gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

const iResolution = gl.getUniformLocation(program, 'iResolution');
const iTime = gl.getUniformLocation(program, 'iTime');

function render(time) {
  gl.uniform2f(iResolution, canvas.width, canvas.height);
  gl.uniform1f(iTime, time * 0.001);
  gl.drawArrays(gl.TRIANGLES, 0, 6);
  requestAnimationFrame(render);
}
requestAnimationFrame(render);