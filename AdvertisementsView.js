
export function buildAdvertisementItem(advertisement) {
    let advertisementTemplate = `
    <div class="card" style="width: 18rem;">
        <img width='100px' height='100px' src="${advertisement.image_url}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${advertisement.name}</h5>
          <h6 >Description</h6>
          <p class="card-text">${advertisement.description}</p>
          <h6>Price</h6>
          <p>${advertisement.price}</p>
          <h6>Type</h6>
          <p>${advertisement.type}</p>
          <a href="/advertisementDetail.html?id=${advertisement.id}" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>
    `

    return advertisementTemplate
}


export function buildAdvertisementsSpinnerView() {

  return `

  <div class="loader">
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  </div> `

}

export function buildNotFoundAdvertisementsView() {
  return `
    <h1>Ooops!! No hay auncios que mostrar </h1>
  `
}