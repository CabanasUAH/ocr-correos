const imagenInput =
document.getElementById("imagen");

const resultados =
document.getElementById("resultados");

let codigos = [];

document
.getElementById("leer")
.addEventListener("click", leerImagen);

document
.getElementById("pdf")
.addEventListener("click", generarPDF);

document
.getElementById("limpiar")
.addEventListener("click", limpiar);

async function leerImagen() {

  const archivo =
  imagenInput.files[0];

  if (!archivo) {

    alert("Selecciona una foto");

    return;
  }

  resultados.innerHTML =
  "<p>Leyendo imagen...</p>";

  const resultado =
  await Tesseract.recognize(
    archivo,
    "spa"
  );

  const texto =
  resultado.data.text.toUpperCase();

  const encontrados =
  texto.match(
    /[A-Z0-9]{18,30}[A-Z]/g
  ) || [];

  codigos =
  [...new Set(encontrados)];

  mostrarResultados();
}

function mostrarResultados() {

  resultados.innerHTML = "";

  codigos.forEach(codigo => {

    const div =
    document.createElement("div");

    div.className =
    "codigo";

    const svg =
    document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );

    JsBarcode(
      svg,
      codigo,
      {
        format:"CODE128",
        height:80,
        width:2
      }
    );

    div.appendChild(svg);

    const p =
    document.createElement("p");

    p.textContent =
    codigo;

    div.appendChild(p);

    resultados.appendChild(div);

  });
}

function limpiar() {

  codigos = [];

  resultados.innerHTML = "";

  imagenInput.value = "";
}

function generarPDF() {

  const { jsPDF } =
  window.jspdf;

  const pdf =
  new jsPDF();

  let y = 20;

  codigos.forEach(codigo => {

    pdf.text(
      codigo,
      20,
      y
    );

    y += 15;

    if (y > 260) {

      pdf.addPage();

      y = 20;
    }
  });

  pdf.save(
    "correos.pdf"
  );
}
