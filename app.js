const fileInput=document.querySelector("input");
const resultados=document.getElementById("resultados");

let codigos=[];

document.getElementById("scanBtn")
.addEventListener("click",async()=>{

const file=fileInput.files[0];

if(!file) return;

const result=await Tesseract.recognize(
file,
"spa"
);

const texto=result.data.text;

const regex=/[A-Z0-9]{15,30}[A-Z]/g;

codigos=[...new Set(
texto.toUpperCase().match(regex)||[]
)];

mostrarCodigos();

});
