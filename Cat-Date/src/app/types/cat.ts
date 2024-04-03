export interface CatType{
    _ownerId:string,
    name:string,
    img:string,
    eyesColor:string,
    furColor:string,
    weight:string,
    matches:string[],
    _createdOn:string,
    _id:string
    catSwipeIndex:number,
    timeTillMatches:number,
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
