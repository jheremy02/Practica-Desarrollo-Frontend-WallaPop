export default {
    getAdvertisements(){
        
        return fetch('http://localhost:8000/api/advertisements')
        .then(responseHttp=>{
            return responseHttp.json()
        })

    } ,

    async getAdvertisement(advertisementId){
        const url=`http://localhost:8000/api/advertisements/${advertisementId}`
        return fetch(url)
                .then(responseHttp=>{
                    return responseHttp.json()
                })
    },

    async createAdvertisement(body){
        const body={
            name: body.name,
            description: body.description,
            image_url: body.image_url,
            price:body.price,
            type: body.type,
        }

        const response = await fetch('http://localhost:8000/api/advertisements',{
            method: "POST",
            body: JSON.stringify(body),
            headers: {
          "Content-Type": "application/json"
        }})
        
        const data=await response.json()


    }
}