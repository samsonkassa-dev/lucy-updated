import { useQuery } from '@tanstack/react-query';
import axios from "@/api/axios";
import { Blog as BlogType } from '../types/type';


interface BlogResponse {
  overview: BlogType;
}

const fetchBlogs = async (): Promise<BlogType[]> => {
  try {
    const res = await axios.get("/blog");
    // console.log(res)
    return res.data.map((blog: BlogResponse) => ({
      ...blog,
      content: blog.overview,
    }));
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw error;
  }
};

export const useBlogs = () => {
  return useQuery<BlogType[], Error>({
    queryKey: ['blogs'],
    queryFn: fetchBlogs, 
  });
};
