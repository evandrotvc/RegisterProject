import {Request,Response, NextFunction} from 'express';

interface cookieDTO {
    session_id: string
}

export default function EnsureAuth(req: Request , resp: Response, next: NextFunction): void {
    const cookies : cookieDTO  = req.cookies;

    if( !cookies.session_id  ){
        resp.status(401).send({message: "Not Authenticated"});
        return;
    }

    return next(); 
}