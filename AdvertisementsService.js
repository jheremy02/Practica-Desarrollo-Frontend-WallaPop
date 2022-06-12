import { signUpService } from "./SignUpService.js";

export default {
    async getAdvertisements(){
        

        let responseHttp;
        let advertisements;
        try {
            responseHttp=await fetch('http://localhost:8000/api/advertisements')
        } catch (error) {
            throw new Error("No he podido ir por los anuncios")
        }
        
        try {
            
            advertisements=await responseHttp.json()

        } catch (error) {
            throw new Error("No he podido transformar la respuesta a json")
        }

        return advertisements
    } ,

    async getAdvertisement(advertisementId){
        const url=`http://localhost:8000/api/advertisements/${advertisementId}`
        let responseHttp;
        let advertisement;
        try {
            responseHttp=await fetch(url)
        } catch (error) {
            throw new Error("No he podido ir por el anuncio")
        }
        
        try {
            
            advertisement=await responseHttp.json()

        } catch (error) {
            throw new Error("No he podido transformar la respuesta a json")
        }

        if (!responseHttp.ok) {
            
            throw new Error("Anuncio no encontrado")
        }

        return advertisement
    },

    async createAdvertisement(bodyAdvertisement){
        const body={
            name: bodyAdvertisement.name,
            description: bodyAdvertisement.description,
            image_url: bodyAdvertisement.image_url,
            price:bodyAdvertisement.price,
            type: bodyAdvertisement.type,
        }

        let response;

        try {
            response = await fetch('http://localhost:8000/api/advertisements',{
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer "+`${signUpService.getLoggedUser()}`
            }})
            
        } catch (error) {
            throw new Error("No he podido crear el anuncio")
        }

        try {
            const data=await response.json()
        } catch (error) {
            throw new Error("No he podido transformar la respuesta a json")
        }
       
    },

    async deleteAdvertisement (advertisementId) {
        const url=`http://localhost:8000/api/advertisements/${advertisementId}`
        let responseHttp;
        
        try {
            responseHttp=await fetch(url,{
                method:"DELETE",
                headers: {
                    Authorization: "Bearer "+ signUpService.getLoggedUser()
                }
                })
        } catch (error) {
            throw new Error("No he podido borrar por el anuncio")
        }
        
        if (!responseHttp.ok) {
            
            throw new Error("Anuncio no encontrado")
        }
    }
}