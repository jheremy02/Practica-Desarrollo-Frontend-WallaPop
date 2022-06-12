import AdvertisementsService from "./AdvertisementsService.js";
import { buildAdvertisementItem ,buildAdvertisementsSpinnerView ,buildDeleteButtonView} from "./AdvertisementsView.js";
import { NotificationController } from "./NotificationController.js";
import { pubSub } from "./pubSub.js";
import { signUpService } from "./SignUpService.js";
import { decodeToken } from "./utils/decodeToken.js";
import { navigationController } from "./NavigationController.js";
export class AdvertisementDetailController {
    constructor(advertisementDetailElement){
        this.advertisementDetailElement=advertisementDetailElement
        
    }

    async showAdvertisement (advertisementId) {
        
        this.advertisement=null
        const spinnerTemplate = buildAdvertisementsSpinnerView()

        this.advertisementDetailElement.innerHTML=spinnerTemplate

        
        try {
            this.advertisement=await AdvertisementsService.getAdvertisement(advertisementId)
            
            if(!this.advertisement){
                pubSub.publish(pubSub.TOPICS.SHOW_ERROR_NOTIFICATION,"No se encotro el anuncio")
                this.advertisementDetailElement.innerHTML=''
                return;
            }
            const advertisementTemplate=buildAdvertisementItem(this.advertisement)

            const advertisementItem=document.createElement('div')
            advertisementItem.className="advertisement-item"
            advertisementItem.innerHTML=advertisementTemplate
            this.advertisementDetailElement.appendChild(advertisementItem)
            this.advertisementDetailElement.querySelector('.btn.btn-primary').remove()
            this.handleButton()
            navigationController.handleButton()
            pubSub.publish(pubSub.TOPICS.SHOW_SUCCESS_NOTIFICATION,"Anuncio cargado con exito")
            

        } catch (error) {
            
            pubSub.publish(pubSub.TOPICS.SHOW_ERROR_NOTIFICATION,error)
        } finally {
            const loader=this.advertisementDetailElement.querySelector('.loader');
            loader.remove()
        }

        
    } 

    handleButton() {
        const loggedUserToken=signUpService.getLoggedUser()

        if (loggedUserToken) {
            //DECODIFICAMOS TOKEN

            const userInfo=decodeToken(loggedUserToken)

            //comprobamos si el id del usuario logueado es el mismo que el idUser del anuncio

            const isOwner=this.isOwner(userInfo.userId)
            //Pintamos boton
            if (isOwner) {
                this.drawDeleteButton()
            }
        }
    }

    isOwner(userId) {
        return userId===this.advertisement.userId
    }

    async drawDeleteButton() {
        const buttonTemplate=buildDeleteButtonView()
        const parser=new DOMParser()
        const buttonNode=parser.parseFromString(buttonTemplate,'text/html').body.querySelector('button')

        this.advertisementDetailElement.querySelector('div.advertisement-item .card').appendChild(buttonNode)
        const buttonElement=document.querySelector('.btn.btn-danger')
        buttonElement.addEventListener('click',()=>{
            this.deleteButton()
        })
    }

    async deleteButton(){

        const shouldDelete=window.confirm("Estas seguro que deseas borrar este anuncio ?")

        try {
            if (shouldDelete) {
                this.advertisement.innerHTML=buildAdvertisementsSpinnerView()
                await AdvertisementsService.deleteAdvertisement(this.advertisement.id)
                
                window.location.href="/"
            }
        } catch (error) {
            pubSub.publish(pubSub.TOPICS.SHOW_ERROR_NOTIFICATION,error)
        }
        
    }

    
}