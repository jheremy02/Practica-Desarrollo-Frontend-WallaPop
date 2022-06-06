import AdvertisementsService from "./AdvertisementsService.js";
import { buildAdvertisementItem,buildTweetListSpinnerView } from "./AdvertisementsView.js";

document.addEventListener('DOMContentLoaded',async ()=>{
    const advertisementSectionElement= document.querySelector('.advertisements-section')
    const advertisementContainer=document.createElement('div')
    advertisementContainer.className="advertisements-container"

    const spinnerTemplate = buildTweetListSpinnerView()

    advertisementSectionElement.innerHTML=spinnerTemplate

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
            const loader=advertisementSectionElement.querySelector('.loader');
            loader.remove()
        })

        
    
})