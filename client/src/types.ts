//для ошибок с бэка
export type MessageError = {
    status: number;
    data: {
        message: string;
    }
}