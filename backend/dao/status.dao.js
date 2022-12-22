
import Status from '../entities/status.entity'

export async function getNextPagetoken(){
    const status = await Status.find()
    if (status.length == 0) {
        return null
    }
    return status[0].next_page_token
}

export async function updateNextPageToken(next_page_token){
    // if (!Status.find({ "next_page_token" : {$exist : true} })){
    //     const page_token = await Status.create(next_page_token)
    //     return page_token
    // }else {
    //     const previous_page_token = await getNextPagetoken()
    //     await Status.updateOne( {"next_page_token": previous_page_token}, next_page_token )
    //     return page_token
    // }

    const previous_page_token = await getNextPagetoken()
    if(!previous_page_token){
        const page_token = await Status.create({
        "next_page_token" : next_page_token,
        "running_status": true
    })
        return page_token
    }else{
        const page_token = await Status.updateOne( {"next_page_token": previous_page_token}, { $set: {"next_page_token": next_page_token}} )
        return page_token
    }
    
    
}

export async function startMainpipeline(){

}