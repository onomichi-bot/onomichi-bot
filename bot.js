//GitHub Action用
const {TwitterApi}=require('twitter-api-v2');

function getRandomMessage(){
    const msgData=process.env.MESSAGE_DATA;

    if(!msgData)return 'ネタがありません';

    const msgList=msgData.split('\n\n').map(msg=>msg.trim()).filter(msg=>msg.length>0);
    //filterはtrueだけ残す

    const randomIndex=Math.floor(Math.random()*msgList.length);
    return msgList[randomIndex];
}

const client = new TwitterApi({
    appKey: process.env.API_KEY,
    appSecret: process.env.API_SECRET,
    accessToken: process.env.ACCESS_TOKEN,
    accessSecret: process.env.ACCESS_SECRET 
});

const rwClient=client.readWrite;

async function postOnomichiMessage(){
    const message=getRandomMessage();
    try{
        await rwClient.v2.tweet({text:message});
        console.log('投稿に成功しました:',message);
    }catch(error){
        console.error('エラーが発生しました:',error);
    }
}

postOnomichiMessage();





//ターミナルを叩く用
/*require('dotenv').config();  //インストール忘れてた
const { TwitterApi } = require('twitter-api-v2');
const schedule = require('node-schedule');
const messages=require('./messages.js');


function getRandomMessage() {
    if(!messages || messages.length===0){
        return '予備のメッセージです。このメッセージが投稿されているということは、エラーが発生したということです。'
    }
    const validMessages = messages.filter(msg => msg); //空白、文字数オーバーは排除する
    const randomIndex = Math.floor(Math.random() * validMessages.length);
    return validMessages[randomIndex];
}

const client = new TwitterApi({
    appKey: process.env.API_KEY,
    appSecret: process.env.API_SECRET,
    accessToken: process.env.ACCESS_TOKEN,
    accessSecret: process.env.ACCESS_SECRET 
});
//作り直してね

const rwClient = client.readWrite;

async function postOnomichiMessage() {
    const message = getRandomMessage();

    try {
        const { data } = await rwClient.v2.tweet({ text: message });
        console.log('投稿に成功しました！ 投稿内容:', message);
    } catch (error) {
        console.error('エラーが発生しました:', error);
    }
}

function startOnomichiBot() {
   const cronSchedule='5 0 9 * * *';//0 0 9だと8:59になってしまう。妥協
   const job=schedule.scheduleJob(cronSchedule,()=>{
    postOnomichiMessage();
   });
   console.log('Botが起動しました');
}


startOnomichiBot();
*/
