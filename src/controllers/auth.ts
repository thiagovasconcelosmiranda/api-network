import { Response } from "express";
import { ExtendedRequest } from "../types/extended-request";
import {signupSchema} from '../schemas/signup';
import { findUserByEmail, findUserBySlug } from "../services/user";
import { prisma } from "../utils/prisma";
import slug from 'slug';
import { hashSync } from "bcrypt-ts";

export const signup = async (req: ExtendedRequest, res: Response) => {
    const safeData = signupSchema.safeParse(req.body);

    if(!safeData.success){
        res.json({ error: safeData.error.flatten().fieldErrors });
        return;
    }
     
    const hasEmail = await findUserByEmail(safeData.data.email);
    if (hasEmail) {
        res.json({ error: 'E-mail já existe' });
        return;
    }
    let genSlug = true;
    let userSlug = slug(safeData.data.name);

    while (genSlug) {
        const hasSlug = await findUserBySlug(userSlug);
        if (hasSlug) {
            let slugSuffix = Math.floor(Math.random() * 99999).toString();
            userSlug = slug(safeData.data.name + slugSuffix);
        } else {
            genSlug = false;
        }
    }
    
    const hasPassword = await hashSync(safeData.data.password);



    res.json(hasPassword); 
}


export const signin = (req: ExtendedRequest, res: Response) => {
    res.json({email: req.body.email, password: req.body.password});
}