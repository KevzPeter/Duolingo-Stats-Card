export type Data = {
    status: string,
    body: string | Object
}
export interface Params {
    id: string,
    username: string,
    theme: string,
    showAvatar: string,
    showJoined: string,
}

export interface DisplayOptions {
    showAvatar: boolean,
    showJoined: boolean,
}
export interface Metadata {
    "achievements": Array<any>,
    "hasFacebookId": boolean,
    "totalXp": number,
    "id": number,
    "acquisitionSurveyReason": string,
    "fromLanguage": string,
    "picture": string,
    "canUseModerationTools": boolean,
    "emailVerified": boolean,
    "currentCourseId": string,
    "joinedClassroomIds": Array<any>,
    "hasPhonenumber": boolean,
    "hasRecentActivity15": boolean,
    "courses": Array<Course>,
    "streak": number,
    "creationDate": number,
    "name": string,
    "_achievements": Array<any>,
    "globalAmbassadorStatus": object,
    "roles": Array<string>,
    "motivation": string,
    "hasPlus": false,
    "observedClassroomIds": Array<number>,
    "hasGoogleId": boolean,
    "privacySettings": Array<String>,
    "learningLanguage": string,
    "location": string,
    "username": string,
    "avatarBase64"?: string
}
export interface Course {
    "preload": boolean,
    "placementTestAvailable": boolean,
    "authorId": string,
    "title": string,
    "learningLanguage": string,
    "xp": number,
    "healthEnabled": boolean,
    "fromLanguage": string,
    "crowns": number,
    "id": string
}
