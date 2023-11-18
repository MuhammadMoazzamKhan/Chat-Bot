import axios from 'axios';
import { API_KEY } from '../Constants';

const client = axios.create({
    headers: {
        "Authorization": "Bearer " + API_KEY,
        "Content-Type": "application/json"
    }
});

const ChatGPTEndPoint = 'https://api.openai.com/v1/chat/completions'
const dellEEndPoint = 'https://api.openai.com/v1/images/generations'

export const apiCall = async (prompt, messages) => {
    try {
        const res = await client.post(ChatGPTEndPoint, {
            model: "gpt-3.5-turbo",
            messages: [{
                "role": "user",
                "content": `Does this message want to generate an AI picture, art ,image or anything similar? ${prompt} . Similar answer with a yes and no.`
            }]
        })
        console.log('data: ' + JSON.stringify(res.data?.choices[0]?.message?.content))
        let artApi = JSON.parse(JSON.stringify(res.data?.choices[0]?.message?.content));
        if (artApi.toLowerCase().includes('yes')) {
            console.log('dell Api')
            return dell_A_APICall(prompt, messages || {});
        } else {
            console.log('Chat GPT')
            return chatGPTAPICall(prompt, messages || {});
        }
    } catch (error) {
        console.log(error)
        return Promise.resolve({ success: false, error: error.message })
    }
}


const chatGPTAPICall = async (prompt, messages) => {
    try {
        const { data } = await client.post(ChatGPTEndPoint, {
            model: "gpt-3.5-turbo",
            messages
        })
        const answer = JSON.parse(JSON.stringify(data?.choices[0]?.message?.content));
        messages.push({ role: 'assistant', content: answer.trim() });
        return Promise.resolve({ success: true, data: messages })
    } catch (error) {
        console.log(error)
        return Promise.resolve({ success: false, error: error.message })
    }
}


const dell_A_APICall = async (prompt, messages) => {
    try {
        const { data } = await client.post(dellEEndPoint, {
            "prompt": "A cute baby sea otter",
            "n": 1,
            "size": "512x512"
        })
        const url = JSON.parse(JSON.stringify(data?.data[0]?.url));
        console.log(url)
        messages.push({ role: 'assistant', content: url });
        return Promise.resolve({ success: true, data: messages })
    } catch (error) {
        console.log(error)
        return Promise.resolve({ success: false, error: error.message })
    }
}