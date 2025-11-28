import { Course, Metadata } from "./models";

export const sortCourses = (data: Metadata, sortField: string) => {
    if (sortField === "xp")
        data.courses.sort(xpComparator)
    // Deprecated: sort by crowns
    else if (sortField === "crowns")
        data.courses.sort(crownComparator)
}

const crownComparator = (courseA: Course, courseB: Course) => {
    return courseB.crowns - courseA.crowns;
}

const xpComparator = (courseA: Course, courseB: Course) => {
    return courseB.xp - courseA.xp;
}