import axios from "@/api/axios"
import { paymentData } from "@/types/type"


export const usePostCheckout = () => {
    const checkoutCourse = async (paymentData: paymentData[]) =>{
        try{
            const response = await axios.post("/payments", paymentData);
            console.log(response.data)
            return response.data;
        } catch (error) {
            console.log(error)
            return Promise.reject(error)
        }
    };
    return {checkoutCourse}
}