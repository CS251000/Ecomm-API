import UserModel from "./user.model.js";
import jwt from "jsonwebtoken";
export default class UserController{

    signUp(req,res){
        const {name,email,password,type}= req.body;
       const newuser= UserModel.signUp(name,email,password,type);
       res.status(201).send(newuser);
    }

    signIn(req,res){
        const result= UserModel.signIn(
            req.body.email,
            req.body.password
        );
        if(!result){
            return res.status(400).send('Incorrect credentials');
        }else{
            const token= jwt.sign({userID : result.id,email: result.email,},"VY28pPCfUW",{expiresIn:"1h"});
            return res.status(200).send(token);
        }


    }


}