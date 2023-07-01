import instance from "./instance.js";

const loginFunction = async (body) => {
    try{
        return await instance.post('/login', body);
    } catch(err) {
        console.log('Error', err);
    }
    
}

export default loginFunction;