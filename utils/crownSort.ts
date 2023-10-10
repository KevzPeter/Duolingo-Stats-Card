import { Course, Metadata } from "./models";

export const crownSort = (data: Metadata) => {
    data.courses.sort(crownComparator)
}

const crownComparator = (courseA: Course, courseB: Course) => {
    return courseB.crowns - courseA.crowns;
}
