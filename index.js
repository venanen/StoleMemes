import axios from "axios";
import Telegram from "./telegram.js";
import Vk from "./vk.js";
import fs from 'fs'





const token = 'токен вк'
const allowedTypeAttachment = ['photo']

const memesGroups = ['saintbeobanka', 'demotiva',] // список id групп


const botToken = 'ТокенБота'
const telegram = new Telegram(botToken, '@IDканала')

const vk = new Vk(token, memesGroups)

const args = process.argv
if(args[2] === 'get'){
    const res = await vk.processAll()
    vk.storePosts(res)
}
if(args[2] === 'post'){
    telegram.postPartGroup(JSON.parse(fs.readFileSync('posts.txt', 'utf8')))
}
//const res = await vk.processAll()
//vk.storePosts(res)

//vk.storePosts(res)
//await telegram.processVkPosts(res)
// //let a = items.filter(val => val.attachments !== undefined)[0]
// //console.log(a, a.attachments[0].photo.sizes.at(-1))
//console.log(res, res.length)


//await telegram.sendText('Test')
//await telegram.sendPhoto('Test', p[0])
//await telegram.sendMediaGroup('Test', p)
console.log('-----------------------')