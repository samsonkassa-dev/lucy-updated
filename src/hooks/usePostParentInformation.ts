import axios from "@/api/axios";
import { ParentData } from "@/types/type";
import { useFormContext } from "@/utils/FormContext";

export const usePostParentInformation = () => {
  const { setParentId, parentId } = useFormContext();
  const postParentInfo = async (parentData: ParentData) => {
    try {
      const response = await axios.post("/parent", parentData);
      const parentID = response?.data?.id
      setParentId(parentID); 
      console.log(response?.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  };
  return { postParentInfo };
};
