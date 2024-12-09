import { Response } from "express";
import { ExtendedRequest } from "../types/extended-request";
import {signupSchema} from '../schemas/signup';
import { findUserByEmail } from "../services/user";

export const signup = async (req: ExtendedRequest, res: Response) => {
    const safeData = signupSchema.safeParse(req.body);

    if(!safeData.success){
        res.json({ error: safeData.error.flatten().fieldErrors });
        return;
    }
     
    const hasEmail = await findUserByEmail(safeData.data.email);
    
        
    res.json(hasEmail);
    
}


export const signin = (req: ExtendedRequest, res: Response) => {
    res.json({email: req.body.email, password: req.body.password});
}