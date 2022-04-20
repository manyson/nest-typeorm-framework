import {Injectable, NestMiddleware,} from '@nestjs/common';
import {NextFunction, Request, Response} from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {

    /**
     * todo middleware 에서 구한할 로직이 있으면 해당 부분에서 구현
     */
    console.log(req.body);
    console.log(req.query);
    console.log(req.headers);
    next();
  }
}