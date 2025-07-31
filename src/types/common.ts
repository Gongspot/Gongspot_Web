export type CommonResponse<T> = {
    isSuccess: boolean;
    code: number;
    message: string;
    result: T
};