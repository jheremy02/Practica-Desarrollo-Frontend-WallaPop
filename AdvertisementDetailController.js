import AdvertisementsService from "./AdvertisementsService.js";
import { buildAdvertisementItem ,buildAdvertisementsSpinnerView} from "./AdvertisementsView.js";
import { pubSub } from "./pubSub.js";
export class AdvertisementDetailController {
    constructor(advertisementDetailElement){
        this.advertisementDetailElement=advertisementDetailElement
    }

    async showAdvertisement (advertisementId) {
        
        
        const spinnerTemplate = buildAdvertisementsSpinnerView()

        this.advertisementDetailElement.innerHTML=spinnerTemplate

        try {
            const advertisement=await AdvertisementsService.getAdvertisement(advertisementId)

            const advertisementTemplate=buildAdvertisementItem(advertisement)

            const advertisementItem=document.createElement('div')
            advertisementItem.className="advertisement-item"
            advertisementItem.innerHTML=advertisementTemplate

            this.advertisementDetailElement.appendChild(advertisementItem)
            

        } catch (error) {
            
            pubSub.publish(pubSub.TOPICS.SHOW_ERROR_NOTIFICATION,error)
        } finally {
            const loader=this.advertisementDetailElement.querySelector('.loader');
            loader.remove()
        }

        
    } 
}