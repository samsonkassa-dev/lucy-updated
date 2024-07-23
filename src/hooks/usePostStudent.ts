import axios from "@/api/axios";
import { StudentData, MultiLangCourseData } from "@/types/type";
import { useFormContext } from "@/utils/FormContext";

export const usePostStudent = () => {
  const { setCourseData } = useFormContext();

  const arrStringToArray = (str: string) => {
    if (!str) return [];
    try {
      return JSON.parse(str).map((s: string) => s.trim());
    } catch (e) {
      console.error("Error parsing string to array:", e);
      return [];
    }
  };

  const postStudent = async (
    students: StudentData[],
    parentId: number | null
  ) => {
    try {
      const formattedStudents = students.map((student) => ({
        FirstName: student.FirstName,
        LastName: student.LastName,
        Grade: student.Grade,
        codingLevel: student.codingLevel,
        interest: student.interest,
        parentId,
      }));

      const response = await axios.post("/student", formattedStudents);

      const studentsWithIds = response.data.map(
        (entry: any, index: number) => ({
          ...students[index],
          studentId: entry.student.id,
        })
      );

      const allCourseData: MultiLangCourseData = {
        en: [],
        am: [],
      };

      const recResponses = await axios.post(
        "/recommendations/recommend-course",
        studentsWithIds.map(
          (student: {
            interest: string;
            codingLevel: string;
            Grade: string;
          }) => ({
            interest: student.interest,
            codingLevel: student.codingLevel,
            gradeLevel: student.Grade,
          })
        )
      );

      if (recResponses.data && Array.isArray(recResponses.data)) {
        recResponses.data.forEach((coursePair: any[], index: number) => {
          if (coursePair.length === 2) {
            coursePair.forEach((course) => {
              if (course.language === "english") {
                allCourseData.en.push({
                  ...course,
                  topicsCovered: arrStringToArray(course.topicsCovered),
                  skillsGained: arrStringToArray(course.skillsGained),
                  studentId: studentsWithIds[index].studentId,
                });
              } else if (course.language === "amharic") {
                allCourseData.am.push({
                  ...course,
                  topicsCovered: arrStringToArray(course.topicsCovered),
                  skillsGained: arrStringToArray(course.skillsGained),
                  studentId: studentsWithIds[index].studentId,
                });
              }
            });
          } else {
            console.error("Invalid course data pair received:", coursePair);
          }
        });
      } else {
        console.error("Invalid course data received:", recResponses.data);
        return Promise.reject("Invalid course data");
      }

      setCourseData((prevCourseData: MultiLangCourseData | null) => {
        const updatedCourseData = prevCourseData
          ? {
              en: [...prevCourseData.en, ...allCourseData.en],
              am: [...prevCourseData.am, ...allCourseData.am],
            }
          : allCourseData;

        return updatedCourseData;
      });
    } catch (error) {
      console.error("Error posting student data:", error);
      return Promise.reject(error);
    }
  };

  return { postStudent };
};
