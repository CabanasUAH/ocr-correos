self.addEventListener(
"install",
event=>{

event.waitUntil(

caches.open("ocr-v1")
.then(cache=>{

return cache.addAll([
"/",
"/index.html",
"/styles.css",
"/app.js",
"/manifest.json"
]);

})

);

});
