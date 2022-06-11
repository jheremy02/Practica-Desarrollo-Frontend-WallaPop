
import { AdvertisementDetailController } from "./AdvertisementDetailController.js";

document.addEventListener('DOMContentLoaded',()=>{
    const advertisementContainerElement=document.querySelector(".advertisement-detail-container")
    const searchParams=new URLSearchParams(window.location.search)

    const advertisementId=searchParams.get("id")

    const advertisementDetailController = new AdvertisementDetailController(advertisementContainerElement)

    advertisementDetailController.showAdvertisement(advertisementId)
})