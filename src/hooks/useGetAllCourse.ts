import { useQuery } from '@tanstack/react-query';
import axios from "@/api/axios";
import { CourseData } from '@/types/type';
import { useRouter, useSearchParams } from "next/navigation";


const arrStringToArray = (str: string) => {
    if (!str) return [];
    return str.replace("[", "").replace("]", "").split(",").map(s => s.trim().replace(/['"]/g, ""));
  };

const getCourses = async (locale: string): Promise<CourseData[]> => {
  try {
    const endpoint = locale ==='am' ? 'course/amharic' : 'course/english'
    const response = await axios.get(endpoint);
    // console.log(response)
    const data: CourseData[] = response.data.course;
    const cleanedData: CourseData[] = data.map((course: CourseData) => ({
      ...course,
      topicsCovered: arrStringToArray(course.topicsCovered as unknown as string),
      skillsGained: arrStringToArray(course.skillsGained as unknown as string),
    }));

    return cleanedData;
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error; // Rethrow the error to handle it in the component
  }
};
export const useGetCourses = () => {
  const searchParams = useSearchParams();
  const locale = searchParams.get('locale') || 'en'; 
    return useQuery<CourseData[], Error>({
      queryKey: ['courses', locale], 
      queryFn: () => getCourses(locale),
      
    });
  };