import axios from "axios";
import Telegram from "./telegram.js";
import Vk from "./vk.js";
import fs from 'fs'





const token = 'токен вк'
const memesGroups = ['saintbeobanka', 'demotiva',] // список id групп
const vk = new Vk(token, memesGroups)


const botToken = 'ТокенБота'
const telegram = new Telegram(botToken, '@IDканала')


const args = process.argv
if(args[2] === 'get'){
    const res = await vk.processAll()
    vk.storePosts(res)
}
if(args[2] === 'post'){
    telegram.postPartGroup(JSON.parse(fs.readFileSync('posts.txt', 'utf8')))
}
console.log('-----------------------')
