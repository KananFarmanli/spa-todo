import axios from "axios";

const headers = {
    "X-Authorization": "pk_495500825ed2c9357b54e897c5804ebb7613869b9b8b3",
    "Accept": "application/json",
    "Content-Type": "application/json",
};
const headers2 = {
    "X-Authorization": "sk_495501498efc314e21cf93d547f21b28f4993556e3e94",
    "Accept": "application/json",
    "Content-Type": "application/json",
};

export const axiosInstance = axios.create({
    baseURL: 'https://api.chec.io/v1',
    headers,
})







 export const axiosBody = ()=> {
    
  
  }




