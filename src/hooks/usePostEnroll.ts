import axios from "@/api/axios"
import { enrollData } from "@/types/type"


export const usePostEnroll = () => {
    const enrollCourse = async (enrollData: enrollData[]) =>{
        try{
            const response = await axios.post("/enrollments", enrollData);
            console.log(response.data)
            return response.data;
        } catch (error) {
            console.log(error)
            return Promise.reject(error)
        }
    };
    return {enrollCourse}
}