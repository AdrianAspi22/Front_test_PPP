export interface BaseResponse{
    succeeded: boolean;
    pageItemsEndsAt:number;
    pageItemsStartsAt:number;
    data: any;
    items:any;
    messages: any;
    detailedErrors: DetailError[];
    totalItems:number;
    errors:any;
}

interface DetailError{
    code:string;
    data:string;
}
