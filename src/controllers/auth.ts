import { Response } from "express";
import { ExtendedRequest } from "../types/extended-request";

export const signup = (req: ExtendedRequest, res: Response) => {
    res.json({name: req.body.name, email: req.body.email});
}


export const signin = (req: ExtendedRequest, res: Response) => {
    res.json({email: req.body.email, password: req.body.password});
}