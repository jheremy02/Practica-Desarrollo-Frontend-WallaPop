import AdvertisementsService from "./AdvertisementsService.js";
import {AdvertisementsController} from "./AdvertisementsController.js";
import { NotificationController } from "./NotificationController.js";

document.addEventListener('DOMContentLoaded',async ()=>{
    const advertisementsSectionElement= document.querySelector('.advertisements-section')
    const notificationElement=document.querySelector('.notification')
    const notificationController=new NotificationController(notificationElement)
    const advertisementContainer=document.createElement('div')
    advertisementContainer.className="advertisements-container"

    const advertisementsController=new AdvertisementsController(advertisementsSectionElement)
    await advertisementsController.showAdvertisements()

        
    
})