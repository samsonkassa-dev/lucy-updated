import axios from "@/api/axios";
import { StudentData, MultiLangCourseData } from "@/types/type";
import { useFormContext } from "@/utils/FormContext";

export const usePostStudent = () => {
  const { setCourseData } = useFormContext();

  const arrStringToArray = (str: string) => {
    if (!str) return [];
    return str.replace("[", "").replace("]", "").split(",").map(s => s.trim().replace(/['"]/g, ""));
  };

  const postStudent = async (students: StudentData[], parentId: number | null) => {
    try {
      const formattedStudents = students.map(student => ({
        FirstName: student.FirstName,
        LastName: student.LastName,
        Grade: student.Grade,
        codingLevel: student.codingLevel,
        interest: student.interest,
        parentId,
      }));

      const response = await axios.post("/student", formattedStudents);

      console.log(response)

      const studentsWithIds = response.data.map((entry: any, index: number) => ({
        ...students[index],
        studentId: entry.student.id,
      }));

      console.log(studentsWithIds)

      const allCourseData: MultiLangCourseData = {
        en: [],
        am: []
      };

      await Promise.all(
        studentsWithIds.map(async (student: { interest: string; codingLevel: string; Grade: string; }, index: number) => {
          try {
            const recResponse = await axios.post("/recommendations/recommend-course", [{
              interest: student.interest,
              codingLevel: student.codingLevel,
              gradeLevel: student.Grade,
            }]);

            console.log(recResponse)
            
            if (recResponse.data && Array.isArray(recResponse.data)) {
              recResponse.data.forEach((coursePair) => {
                const [englishCourse, amharicCourse] = coursePair;
      
                if (englishCourse.language === 'english') {
                  allCourseData.en.push({
                    ...englishCourse,
                    topicsCovered: arrStringToArray(englishCourse.topicsCovered),
                    skillsGained: arrStringToArray(englishCourse.skillsGained),
                    studentId: studentsWithIds[index].studentId,
                  });
                }
      
                if (amharicCourse.language === 'amharic') {
                  allCourseData.am.push({
                    ...amharicCourse,
                    topicsCovered: arrStringToArray(amharicCourse.topicsCovered),
                    skillsGained: arrStringToArray(amharicCourse.skillsGained),
                    studentId: studentsWithIds[index].studentId,
                  });
                }
              });
            } else {
              console.error("Invalid course data received:", recResponse.data);
              return Promise.reject("Invalid course data");
            }
          } catch (error) {
            console.error("Error fetching course recommendation:", error);
            return Promise.reject(error);
          }
        })
      );
      
      
      
      

      setCourseData((prevCourseData: MultiLangCourseData | null) => {
        const updatedCourseData = prevCourseData ? {
          english: [...prevCourseData.english, ...allCourseData.english],
          amharic: [...prevCourseData.amharic, ...allCourseData.amharic]
        } : allCourseData;

        console.log(updatedCourseData);
        return updatedCourseData;
      });
    } catch (error) {
      console.error("Error posting student data:", error);
      return Promise.reject(error);
    }
  };

  return { postStudent };
};
