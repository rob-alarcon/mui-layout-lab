export interface INote {
    id?: string,
    title: string,
    details: string,
    category: string, // TODO: make this an enum
    createdDate?: Date,
    isDeleted?: boolean
}