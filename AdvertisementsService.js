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

    async createAdvertisement(bodyAdvertisement){
        const body={
            name: bodyAdvertisement.name,
            description: bodyAdvertisement.description,
            image_url: bodyAdvertisement.image_url,
            price:bodyAdvertisement.price,
            type: bodyAdvertisement.type,
        }

        const response = await fetch('http://localhost:8000/api/advertisements',{
            method: "POST",
            body: JSON.stringify(body),
            headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer "+"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoiamhleXNvbiIsImlhdCI6MTY1NDkxODc5MSwiZXhwIjoxNjU1MDA1MTkxfQ.QkVc8yj-r6XTShMm-dsabyFLG508p8hpwWYZetKiuzc"
        }})
        
        const data=await response.json()


    }
}