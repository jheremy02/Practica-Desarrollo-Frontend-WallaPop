import advertisementsService from "./AdvertisementsService.js";
import { buildAdvertisementsSpinnerView ,buildAdvertisementItem,buildNotFoundAdvertisementsView} from "./AdvertisementsView.js";
import { pubSub } from "./pubSub.js";
export class AdvertisementsController{
    constructor (advertisementsElement){
        this.advertisementsElement=advertisementsElement
    }
    
    async showAdvertisements () {

        let advertisements;

        const spinnerTemplate = buildAdvertisementsSpinnerView()

        this.advertisementsElement.innerHTML=spinnerTemplate

        try {
            advertisements=await advertisementsService.getAdvertisements()
            if (advertisements.length===0) {
                this.advertisementsElement.innerHTML=buildNotFoundAdvertisementsView()
            }

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

        } catch (error) {

            pubSub.publish(pubSub.TOPICS.SHOW_ERROR_NOTIFICATION,error)
        } finally {
            const loader=this.advertisementsElement.querySelector('.loader');
            loader.remove()
        }
        
        /*
        fetch('http://localhost:8000/api/advertisements')
        .then(data=>{
            return data.json()
        }).then(result=>{
            
        })
        */
    }

    async onSubmitForm(){

        
    }

    async createAdvertisement(body) {

        try {
            await advertisementsService.createAdvertisement(body)
        } catch (error) {
            console.log(error)
        }

    }
}