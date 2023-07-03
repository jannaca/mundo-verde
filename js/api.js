const contenedorGaleria = document.querySelector(".caja-fotos");
const numeroAleatorio = Math.floor(Math.random() * 20);
const url =
  "https://pixabay.com/api/?key=35516619-30dc8f5e33d6099bd7893ed2e&q=environment&image_type=photo&per_page=3&page=" +
  numeroAleatorio;

fetch(url)
  .then((res) => res.json())
  .then((data) => {
    // console.log(data);
    let fotosArray = data.hits;
    for (i = 0; i < fotosArray.length; i++) {
      const contenedorFotos = document.createElement("div");
      contenedorFotos.classList.add("col-md-4");
      const fotos = document.createElement("img");
      fotos.src = fotosArray[i].largeImageURL;
      fotos.classList.add("img-fluid");
      fotos.classList.add("imagen-api");
      contenedorFotos.appendChild(fotos);
      contenedorGaleria.appendChild(contenedorFotos);
    }
  })
  .catch((error) => console.log(error));
