import axios from 'axios';

export const getConteries = async() =>{
    try{
        const data = await axios.get(baseUrl + 'countries');
        console.log(data);
    }catch(error){
        console.log(error);
    }
}