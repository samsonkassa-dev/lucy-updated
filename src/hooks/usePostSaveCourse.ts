import axios from "@/api/axios"
import { SaveCourse } from "@/types/type"


export const usePostCourse = () => {

    
    const postCourse = async (saveCourse: SaveCourse[]) =>{
        try{
            const response = await axios.post("/recommendations", saveCourse);
            console.log(response.data)
            return response.data;
        } catch (error) {
            console.log(error)
            return Promise.reject(error)
        }
    };
    return {postCourse}
}