import { atom } from "recoil";

export enum Status {
    TODO = "TODO",
    IN_PROGRESS = "IN_PROGRESS",
    UNDER_REVIEW = "UNDER_REVIEW",
    FINISHED = "FINISHED"
}

export const taskSheetOpenState = atom({
    key: 'taskSheetOpenState',
    default: false
})

export const selectedStatusState = atom<Status | null>({
    key: 'selectedStatusState',
    default: null
})