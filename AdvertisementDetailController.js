import AdvertisementsService from "./AdvertisementsService.js";
import { buildAdvertisementItem } from "./AdvertisementsView.js";

export class AdvertisementDetailController {
    constructor(advertisementDetailElement){
        this.advertisementDetailElement=advertisementDetailElement
    }

    async showAdvertisement (advertisementId) {
        const advertisement=await AdvertisementsService.getAdvertisement(advertisementId)

        console.log(advertisement)
        const advertisementTemplate=buildAdvertisementItem(advertisement)

        const advertisementItem=document.createElement('div')
        advertisementItem.className="advertisement-item"
        advertisementItem.innerHTML=advertisementTemplate

        this.advertisementDetailElement.appendChild(advertisementItem)

    } 
}