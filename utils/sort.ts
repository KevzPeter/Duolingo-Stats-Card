import { Course, Metadata } from "./models";

export const crownSort = (data: Metadata) => {
    data.courses.sort(crownComparator)
}

const crownComparator = (courseA: Course, courseB: Course) => {
    return courseB.crowns - courseA.crowns;
}

const xpComparator = (courseA: Course, courseB: Course) => {
    return courseB.xp - courseA.xp;
}

export const xpSort = (data: Metadata) => {
    data.courses.sort(xpComparator)
}