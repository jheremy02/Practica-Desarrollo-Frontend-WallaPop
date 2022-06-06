
import { buildAdvertisementItem } from "./AdvertisementsView.js";

document.addEventListener('DOMContentLoaded',async ()=>{
    const advertisementSectionElement= document.querySelector('.advertisements-section')
    const advertisementContainer=document.createElement('div')
    advertisementContainer.className="advertisements-container"

    fetch('http://localhost:8000/api/advertisements')
        .then(data=>{
            return data.json()
        }).then(result=>{
            result.forEach(element => {
                const advertisementNewItem= document.createElement('div')
                advertisementNewItem.className='advertisement-item'
                const advertisementTemplate = buildAdvertisementItem(element)
                advertisementNewItem.innerHTML=advertisementTemplate

                advertisementContainer.appendChild(advertisementNewItem)
            });
            
            advertisementSectionElement.append(advertisementContainer)
        })


})