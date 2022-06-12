import { CreateAdvertisement } from "./CreateAdvertisementController.js";
import { NotificationController } from "./NotificationController.js";

document.addEventListener('DOMContentLoaded',()=>{
const createFormElement=document.querySelector('form');
const notificationElement=document.querySelector('.notification')
const notificationController=new NotificationController(notificationElement)

const createAdvertisement=new CreateAdvertisement(createFormElement)



})