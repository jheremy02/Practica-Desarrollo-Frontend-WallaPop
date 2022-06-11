import { CreateAdvertisement } from "./CreateAdvertisementController.js";


document.addEventListener('DOMContentLoaded',()=>{
const createFormElement=document.querySelector('form');

const createAdvertisement=new CreateAdvertisement(createFormElement)

})