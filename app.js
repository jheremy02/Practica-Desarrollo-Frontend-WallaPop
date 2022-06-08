import AdvertisementsService from "./AdvertisementsService.js";
import {AdvertisementsController} from "./AdvertisementsController.js";

document.addEventListener('DOMContentLoaded',async ()=>{
    const advertisementsSectionElement= document.querySelector('.advertisements-section')
    const advertisementContainer=document.createElement('div')
    advertisementContainer.className="advertisements-container"

    const advertisementsController=new AdvertisementsController(advertisementsSectionElement)
    await advertisementsController.showAdvertisements()

        
    
})