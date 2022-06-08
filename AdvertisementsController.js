import AdvertisementsService from "./AdvertisementsService.js";
import { buildAdvertisementsSpinnerView ,buildAdvertisementItem} from "./AdvertisementsView.js";

export class AdvertisementsController{
    constructor (advertisementsElement){
        this.advertisementsElement=advertisementsElement
    }
    
    async showAdvertisements () {

        let advertisements;

        const spinnerTemplate = buildAdvertisementsSpinnerView()

        this.advertisementsElement.innerHTML=spinnerTemplate

        try {
            advertisements=await AdvertisementsService.getAdvertisements()
            const advertisementsContainer= document.createElement('div')
            advertisementsContainer.className='advertisements-container'
            advertisements.forEach(element => {
                const advertisementNewItem= document.createElement('div')
                advertisementNewItem.className='advertisement-item'
                const advertisementTemplate = buildAdvertisementItem(element)
                advertisementNewItem.innerHTML=advertisementTemplate

                advertisementsContainer.appendChild(advertisementNewItem)
            });
            
            this.advertisementsElement.append(advertisementsContainer)
            const loader=this.advertisementsElement.querySelector('.loader');
            loader.remove()
        } catch (error) {
            console.log(error)
        }
        
        /*
        fetch('http://localhost:8000/api/advertisements')
        .then(data=>{
            return data.json()
        }).then(result=>{
            
        })
        */
    }
}