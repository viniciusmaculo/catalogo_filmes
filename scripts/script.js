
function GET() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "https://rafaelescalfoni.github.io/desenv_web/filmes.json", false)
    xhr.send()
    return xhr.responseText
}

function criarLinha(lista, lista_aux) {

  let i = 0
  let rating = 0

    const boxes = document.createElement("div")
    boxes.classList.add('boxes')
    
    boxes.innerHTML = `

      <div class="classificacao_conteiner">
        <div class="classificacao--${lista.classificacao}">
        ${lista.classificacao == 0 ? "Livre" : `${lista.classificacao}`}
      </div>
      </div>

      ${lista.opinioes
        .map((element) => {
          i++;
          rating += element.rating;
        }).join("")}

      <div class="estrelas">${
        rating / i < 5
        ? `<img alt="estrela" src="images/star_yellow.png"/> <img alt="estrela" 
        src="images/star_yellow.png"/> <img alt="estrela" src="images/star_yellow.png"/> 
        <img alt="estrela" src="images/star_yellow.png"/> <img alt="estrela" src="images/star_grey.png"/>`
        : `<img alt="estrela" src="images/star_yellow.png"/> <img alt="estrela" src="images/star_yellow.png"/> 
        <img alt="estrela" src="images/star_yellow.png"/> <img alt="estrela" 
        src="images/star_yellow.png"/> <img alt="estrela" src="images/star_yellow.png"/>`
        }
        </div>

      <img class="banner_img" alt="Banner" src="${lista.figura}"/>
      <h2>${lista.titulo}</h2>
      <p>${lista.generos}</p>

      <p><strong>Elenco: </strong>${lista.elenco}</p>

      <p>${lista.resumo}</p>

      <p><strong>Títulos similares:</strong></p>
      ${lista.titulosSemelhantes.map((element) => {
        return `<img class="similar_img" src='${lista_aux[element].figura}'/>`;
      }).join("")}

      <div class='opinioes'>
      <p><strong>Opiniões:</strong></p>
      ${lista.opinioes.map((element) => {
        return `<div class='opinioes_box'>${element.descricao}<div>`}).join("")}
      </div>
    
    `

    return boxes;
}

function main() {
    let lista = GET()
    let lista_aux = GET()
    lista = JSON.parse(lista)
    lista_aux = JSON.parse(lista_aux)
    console.log(lista)

    let listagem = document.getElementById("catalogo")

    lista.forEach((element) => {
        let linha = criarLinha(element, lista_aux)
        listagem.appendChild(linha)
    })
}

main()


