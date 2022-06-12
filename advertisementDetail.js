
import { AdvertisementDetailController } from "./AdvertisementDetailController.js";
import { NotificationController } from "./NotificationController.js";

document.addEventListener('DOMContentLoaded',()=>{
    const advertisementContainerElement=document.querySelector(".advertisement-detail-container")
    
    const notificationElement=document.querySelector('.notification')
    const notificationController=new NotificationController(notificationElement)
    const searchParams=new URLSearchParams(window.location.search)

    const advertisementId=searchParams.get("id")

    const advertisementDetailController = new AdvertisementDetailController(advertisementContainerElement)

    advertisementDetailController.showAdvertisement(advertisementId)
})