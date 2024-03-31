export interface CatType{
    _ownerId:string,
    name:string,
    img:string,
    eyesColor:string,
    furColor:string,
    weight:string,
    liked:string[],
    _createdOn:string,
    _id:string
}
export interface CatForCreationType{
    name:string,
    img:string,
    eyesColor:string,
    furColor:string,
    weight:string,
}
export interface Likes{
    _ownerId: string,
    likerId: string,
    likedId: string,
    _createdOn: number,
    _id: string,
}
