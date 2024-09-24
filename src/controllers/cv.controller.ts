import { Request, Response } from "express";
import {
  AwardObjectType,
  CourseObjectType,
  CV,
  ExperienceObjectType,
  ProjectObjectType,
} from "../models/cv.model";

// Define the type for education object
type EducationType = {
  class10School?: string;
  class10Board?: string;
  class10Grade?: string;
  class12College?: string;
  class12Board?: string;
  class12Grade?: string;
  underGraduateCollege?: string;
  underGraduateDegree?: string;
  underGraduateGPA?: string;
  postGraduateCollege?: string;
  postGraduateDegree?: string;
  postGraduateGPA?: string;
};

// Define the type for personal details object
type PersonalDetailsType = {
  name: string;
  email: string;
  location: string;
  profession: string;
  imageUrl: string;
  phoneNumber: string;
  years_of_experience: string;
};

type AchievementsObjectType = {
  awards?: AwardObjectType[];
  courses?: CourseObjectType[];
  projects?: ProjectObjectType[];
};

// Main data type with personal details and education
type DataToBeStoredType = {
  personalDetails: PersonalDetailsType;
  education: EducationType;
  experience: ExperienceObjectType[];
  skills: string[];
  achievements?: AchievementsObjectType;
  profile_summary: string;
};

// requestbody type;
interface RequestBodyType {
  name: string;
  email: string;
  location: string;
  profession: string;
  imageUrl: string;
  phoneNumber: string;
  Years_of_experience: string;
  profile_summary: string;
  class10School: string;
  class10Board: string;
  class10Grade: string;
  class12College: string;
  class12Board: string;
  class12Grade: string;
  underGraduateCollege: string;
  underGraduateDegree: string;
  underGraduateGPA: string;
  postGraduateCollege: string;
  postGraduateDegree: string;
  postGraduateGPA: string;
  Experience: ExperienceObjectType[]; // Experience is an array of objects
  Skills: string[];
  Awards: AwardObjectType[];
  Courses: CourseObjectType[];
  Projects: ProjectObjectType[];
}
export const createCv = async (req: Request, res: Response) => {
  try {
    const {
      name,
      email,
      location,
      profession,
      imageUrl,
      phoneNumber,
      Years_of_experience,
      profile_summary,
      class10School,
      class10Board,
      class10Grade,
      class12College,
      class12Board,
      class12Grade,
      underGraduateCollege,
      underGraduateDegree,
      underGraduateGPA,
      postGraduateCollege,
      postGraduateDegree,
      postGraduateGPA,
      Experience,
      Skills,
      Awards,
      Courses,
      Projects,
    } = req.body as RequestBodyType;

    if (
      !name ||
      !email ||
      !location ||
      !profession ||
      !imageUrl ||
      !phoneNumber ||
      !Years_of_experience ||
      !profile_summary
    ) {
      return res
        .status(400)
        .json(
          "All fields like {name,email,location,profession,imageUrl,phoneNumber,years_of_experience,profile_summary} are required"
        );
    }

    let dataToBeStored: DataToBeStoredType = {
      personalDetails: {
        name,
        email,
        location,
        profession,
        imageUrl,
        phoneNumber,
        years_of_experience: Years_of_experience,
      },
      education: {},
      experience: [],
      skills: [],
      profile_summary,
    };

    const addEducationFields = (
      field: keyof EducationType,
      value: string | undefined
    ) => {
      if (value) {
        dataToBeStored.education[field] = value;
      }
    };
    // const addCourseFields = (
    //   field: keyof EducationType,
    //   value: string | undefined
    // ) => {
    //   if (value) {
    //     dataToBeStored.education[field] = value;
    //   }
    // };
    // const addPFields = (
    //   field: keyof EducationType,
    //   value: string | undefined
    // ) => {
    //   if (value) {
    //     dataToBeStored.education[field] = value;
    //   }
    // };

    // class10fields;
    addEducationFields("class10School", class10School);
    addEducationFields("class10Board", class10Board);
    addEducationFields("class10Grade", class10Grade);

    // class12fields;
    addEducationFields("class12College", class12College);
    addEducationFields("class12Board", class12Board);
    addEducationFields("class12Grade", class12Grade);

    // undergraduate fields;
    addEducationFields("underGraduateCollege", underGraduateCollege);
    addEducationFields("underGraduateDegree", underGraduateDegree);
    addEducationFields("underGraduateGPA", underGraduateGPA);

    // postGraduate fields;
    addEducationFields("postGraduateCollege", postGraduateCollege);
    addEducationFields("postGraduateDegree", postGraduateDegree);
    addEducationFields("postGraduateGPA", postGraduateGPA);

    if (Experience.length > 0) {
      dataToBeStored.experience = Experience;
    }

    if (Skills.length > 0) {
      dataToBeStored.skills = Skills;
    }

    if (Awards.length > 0) {
      dataToBeStored.achievements = {
        awards: Awards,
      };
    }

    if (Courses.length > 0) {
      dataToBeStored.achievements = {
        ...dataToBeStored.achievements,
        courses: Courses,
      };
    }

    if (Projects.length > 0) {
      dataToBeStored.achievements = {
        ...dataToBeStored.achievements,
        projects: Projects,
      };
    }

    const cvData = await CV.create(dataToBeStored);

    return res.json(cvData);
  } catch (error) {
    console.log("ERROR:IN CREATE-CV CONTROLLER", error);
    res.status(500).json("ERROR:IN CREATE-CV CONTROLLER");
  }
};