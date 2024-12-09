import { Response } from "express";
import { ExtendedRequest } from "../types/extended-request";
import {signupSchema} from '../schemas/signup';

export const signup = (req: ExtendedRequest, res: Response) => {
    const safeData = signupSchema.safeParse(req.body);

    if(!safeData.success){
        res.json({ error: safeData.error.flatten().fieldErrors });
        return;
    }
    res.json(safeData.data);
}


export const signin = (req: ExtendedRequest, res: Response) => {
    res.json({email: req.body.email, password: req.body.password});
}