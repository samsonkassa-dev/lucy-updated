export interface DictionaryContent {
  [key: string]: string | DictionaryContent | string[] | DictionaryContent[];
}

export interface BookingData {
  fullName: string;
  email: string;
} 

export interface SaveCourse {
  studentId: number;
  courseId: number;
}

export interface ParentData {
  FirstName: string;
  LastName: string;
  PhoneNumber: string;
  Email: string;
  agrees: boolean;

} 

export interface StudentData {
  FirstName: string;
  LastName: string;
  Grade: string;
  codingLevel: string;
  interest?: string;
}

export interface CourseData {
  id: number;
  name: string;
  description: string;
  images: string[];
  prices: {
    priceId: string;
    currency: string;
    unitAmount: number;
  }[];
  topicsCovered: string[];
  skillsGained: string[];
  studentId: number;
  category: string;
  gradeLevel: string;
  prerequisite: string;
  codingLevel: string;
  language?: string; 
}

export const defaultStudentData: StudentData = {
  FirstName: "",
  LastName: "",
  Grade: "",
  codingLevel: "",
  interest: "",
};

export interface MultiLangCourseData {
  [key: string]: CourseData[];
}

export interface enrollData {
  studentId: number;
  courseId: number;
  startDate: string;
  time: string;
  trainingFrequency: string;
}

export interface FInalRecommendation {

    id: number;
    name: string;
    description: string;
    images: string[];
    prices: {
      priceId: string;
      currency: string;
      unitAmount: number;
    }[];
    topicsCovered: string[];
    skillsGained: string[];
    catagory: string;
    gradeLevel: string;
    prerequisite: string;
    codingLevel: string;
    language: string;
    studentId: number;
  };

export interface paymentData{
  type : string;
  studentId: number;
  courseId: number;
  priceId: string;
} 


export interface Blog {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  image: string;
  priority: string;
  overview: string
}

export interface BlogProps {
  blogs: Blog[];
}