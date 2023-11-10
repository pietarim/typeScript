interface CourseWithDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBasic extends CourseWithDescription {
  kind: "basic";
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

interface CoursePartBackground extends CourseWithDescription {
  backgroundMaterial: string;
  kind: "background";
}

interface SpecialCourse extends CourseWithDescription {
  requirements: string[];
  kind: "special";
}

export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | SpecialCourse;