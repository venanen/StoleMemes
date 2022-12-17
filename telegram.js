import axios from "axios";
import fs from 'fs'
class Telegram{
    constructor(token, destinationChat) {
        this.token  = token
        this.destinationChat  = destinationChat
        this.token  = token
    }

    async callMethod(method, params){
        try{
            return await axios.post(`https://api.telegram.org/bot${this.token}/${method}`, params)
        }catch (e){
            console.error('Error with callMethod', e.response.data)
        }
    }

    async sendText(text){
        return await this.callMethod('sendMessage', {
            "chat_id":this.destinationChat,
            "text":text
        })
    }
    async sendPhoto(text, photo){
        return await this.callMethod('sendPhoto', {
            "chat_id":this.destinationChat,
            "caption":text,
            photo
        })
    }
    async sendMediaGroup(text, arrayOfPhotos){
        let mediaTypes = arrayOfPhotos.map((url, key) => {
            let media =  {
                type: 'photo',
                media: url
            }
            return key === 0 ? {caption: text, ...media} : media
        })
        return await this.callMethod('sendMediaGroup', {
            "chat_id":this.destinationChat,
            "caption":text,
            'media': mediaTypes
        })
    }
    async processVkPosts(posts){
        let request = 0
        for (const post of posts) {
            if(request++ % 14 === 0){
                await this.sleep(1000)
            }
            console.log('Process', request)
            if('photo' in post){
                if(post['photo'].length > 1){
                    await this.sendMediaGroup(post['text'], post['photo'])
                }else{
                    await this.sendPhoto(post['text'], post['photo'][0])
                }
            }else{
                await this.sendText(post['text'])
            }
        }
    }
    async postPartGroup({length, posts}){
        const chunkSize = Math.floor((7 / 100) * length )
        const sliceEnd = chunkSize > length ? length : chunkSize
        const processPosts = posts.slice(0, sliceEnd)
        const otherPosts = posts.slice(sliceEnd, posts.length-1)
        console.log('Proccess part, json len: ', length, 'real post: ', posts.length,' process post: ', processPosts.length, ' other posts: ', otherPosts.length, ' slice end: ', sliceEnd)
        const resObject = {length, posts: otherPosts}
        fs.writeFileSync('posts.txt', JSON.stringify(resObject));
        await this.processVkPosts(processPosts)

    }
    sleep(ms){
        return new Promise(r => setTimeout(r, ms));
    }
}
export default Telegram