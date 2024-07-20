import axios from "@/api/axios"
import { BookingData } from "@/types/type"


export const usePostBook = () => {
    const postBook = async (bookingData: BookingData) =>{
        try{
            const response = await axios.post("/orientation", bookingData);
            console.log(response.data)
            return response.data;
        } catch (error) {
            console.log(error)
            return Promise.reject(error)
        }
    };
    return {postBook}
}