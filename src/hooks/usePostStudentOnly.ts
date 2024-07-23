import axios from "@/api/axios";
import { StudentData, MultiLangCourseData, SaveCourse } from "@/types/type";
import { useFormContext } from "@/utils/FormContext";
import { usePostCourse } from "./usePostSaveCourse";

export const usePostStudentOnly = () => {
  const { finalRecommendation, setFinalRecommendation } = useFormContext();
  const {postCourse} = usePostCourse()

  const postStudentNoRecommendation = async (
    student: StudentData[],
    parentId: number | null
  ) => {
    try {
      const formattedStudents = student.map((student) => ({
        FirstName: student.FirstName,
        LastName: student.LastName,
        Grade: student.Grade,
        codingLevel: student.codingLevel,
        interest: student.interest,
        parentId,
      }));

      const response = await axios.post("/student", formattedStudents);
      const studentId = response.data[0]?.student?.id;
      const courseId = finalRecommendation?.[0].id;

      if (studentId !== undefined && courseId !== undefined && finalRecommendation?.[0].id !==undefined) {

        const updatedRecommendation = [{ ...finalRecommendation[0], studentId }];
        setFinalRecommendation(updatedRecommendation);

        
        const saveCourse: SaveCourse[] = [
          {
            studentId: studentId,
            courseId: courseId,
          },
        ];
        const response = await postCourse(saveCourse);
      }




    } catch (error) {
      console.error("Error during student registration:", error);
    }


  };

  return { postStudentNoRecommendation };
};
