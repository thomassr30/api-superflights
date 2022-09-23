import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from "@nestjs/common"
import { response } from "express";

@Catch()
export class AllExceptionFilter implements ExceptionFilter{

    private readonly logger = new Logger(AllExceptionFilter.name)

    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const res = ctx.getResponse();
        const req = ctx.getRequest();

        const status = 
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;
        
        const msg = exception instanceof HttpException
                    ? exception.getResponse()
                    : exception
        
        this.logger.error(`Status ${status} Error: ${JSON.stringify(msg)}`)

        response.status(status).json({
            time: new Date().toISOString(),
            path: req.url,
            error: msg
        })
    }

}