export const response = (ctx: any, type: string, message: string, code: number = 200) => {
    let status: boolean;
    switch (type) {
        case 'fail':
            status = false;
            break;
        case 'success':
            status = true;
            break;
        default:
            status = true;
            break;
    }

    ctx.response.body = {
        status,
        message,
        code
    }

    ctx.response.status = code;
}

export const simpleResponse = (ctx: any, message: string, code: number = 200) => {
    ctx.response.body = message;
    ctx.response.status = code;
}

export const data = (ctx: any, data:any, message: string, code: number = 200) => {
    ctx.response.body = {
        data,
        message,
        code
    };
    ctx.response.status = code;
}

export const error = (ctx: any, message: string, code: number = 200) => {
    ctx.response.body = {
        data: '',
        message,
        code
    };
    ctx.response.status = code;
}