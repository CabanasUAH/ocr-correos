const video = document.getElementById("video");
const resultados = document.getElementById("resultados");
const estado = document.getElementById("estado");

let codigos = [];

document
.getElementById("iniciar")
.addEventListener("click", iniciarCamara);

document
.getElementById("pdf")
.addEventListener("click", generarPDF);

document
.getElementById("limpiar")
.addEventListener("click", limpiar);

async function iniciarCamara(){

const stream =
await navigator.mediaDevices.getUserMedia({
video:{
facingMode:"environment"
}
});

video.srcObject = stream;

estado.innerText =
"Cámara iniciada";

setInterval(capturarOCR,3000);

}

async function capturarOCR(){

estado.innerText =
"Leyendo...";

const canvas =
document.createElement("canvas");

canvas.width =
video.videoWidth;

canvas.height =
video.videoHeight;

const ctx =
canvas.getContext("2d");

ctx.drawImage(
video,
0,
0
);

const resultado =
await Tesseract.recognize(
canvas,
"spa"
);

const texto =
resultado.data.text
.toUpperCase();

const encontrados =
texto.match(
/[A-Z0-9]{18,30}[A-Z]/g
);

if(!encontrados) return;

encontrados.forEach(codigo=>{

if(!codigos.includes(codigo)){

codigos.push(codigo);

mostrarCodigo(codigo);

}

});

estado.innerText =
`${codigos.length} códigos encontrados`;

}

function mostrarCodigo(codigo){

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

p.innerText =
codigo;

div.appendChild(p);

resultados.appendChild(div);

}

function limpiar(){

codigos=[];

resultados.innerHTML="";

estado.innerText="Limpio";

}

function generarPDF(){

const { jsPDF } =
window.jspdf;

const pdf =
new jsPDF();

let x = 10;
let y = 20;

codigos.forEach((codigo,i)=>{

pdf.text(
codigo,
x,
y
);

y += 15;

if(y>260){

pdf.addPage();

y = 20;

}

});

pdf.save(
"correos.pdf"
);

}
