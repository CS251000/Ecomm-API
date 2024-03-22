import UserModel from "../features/users/user.model.js";

const basicAuthorizer=(req,res,next)=>{
    const authHeader= req.headers["authorization"];
    console.log(authHeader);
    if(!authHeader){
        res.status(401).send("No authorization details found");
    }
    const base64Credentials= authHeader.replace('Basic' ,'');
    console.log(base64Credentials);
    const decodedCreds=Buffer.from(base64Credentials,'base64').toString('utf-8');
    console.log(decodedCreds);
    const creds= decodedCreds.split(':');

    const user=UserModel.getAll().find(u=>u.email==creds[0] && u.password==creds[1]);
    if(user){
        next();
    }else{
        return res.status(401).send("Incorrect credentials");
    }
}

export default basicAuthorizer;