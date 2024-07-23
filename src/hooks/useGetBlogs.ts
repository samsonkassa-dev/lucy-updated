
import { useQuery } from '@tanstack/react-query';
import axios from "@/api/axios";
import { Blog as BlogType } from '../types/type';

const fetchBlogById = async (id: number): Promise<BlogType> => {
  const res = await axios.get(`/blog/${id}`);
  const blog = res.data;
  return blog;
};


export const useBlogById = (id: number) => {
  return useQuery<BlogType, Error>({
    queryKey: ['blog', id],
    queryFn: () => fetchBlogById(id), 
  });
};