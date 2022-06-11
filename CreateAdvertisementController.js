 import advertisementsService from "./AdvertisementsService.js";
 
 export class CreateAdvertisement {
     constructor (createFormElement) {
        this.createFormElement=createFormElement;
        this.main()
        
     }

     main () {
         this.onAnyInputChanged()
         this.onSubmitForm()
     }

     onAnyInputChanged () {
        const inputElements=Array.from(document.querySelectorAll('input , textarea'))
        inputElements.forEach(element=>{
            element.addEventListener('input',()=>{
                this.checkIfAllInputsAreFilled(inputElements)
            })
        })
     }

     checkIfAllInputsAreFilled(inputElements){
        const areAllInputsFilled = inputElements.every(element=>element.value)

        if (areAllInputsFilled) {
            this.createFormElement.querySelector("button").removeAttribute("disabled");

        } else {
            this.createFormElement.querySelector("button").setAttribute("disabled",'');
        }
     }

     onSubmitForm() {
         this.createFormElement.addEventListener('submit',(event)=>{
             event.preventDefault()
             const inputElements=new FormData(this.createFormElement)
             const name = inputElements.get('inputProductName') ;
             const description=inputElements.get('inputDescriptionProduct') ;
             const image_url=inputElements.get('inputImageUrl') ;
             const price=inputElements.get('inputProductPrice') ;
             const type=inputElements.get('gridRadios') ;
             const bodyAdvertisement={name,description,image_url,price,type}
             
             this.createAdvertisement(bodyAdvertisement)
         })
     }

     async createAdvertisement(bodyAdvertisement){
        await advertisementsService.createAdvertisement(bodyAdvertisement)
        console.log('anuncio creado')
     }
 }

 // el formulario deben estar los campos completos
 //al enviar guardar los datos y enviarlos al sevidor
