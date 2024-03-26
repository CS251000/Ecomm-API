import { getDb } from "../../config/mongodb.js";


export default class UserRepository{
     async signUp(newUser){
        try{
        const db= getDb();
        const collection= db.collection('users');
        // const newUser= new UserModel(name,email,password,type);
        // users.push(newUser);
        // newUser.id= users.length+1;
        await collection.insertOne(newUser);

        return newUser;
        }catch(err){
            console.log(err);
            throw(err);
        }

    }

    async signIn(email,password){
        try{
            const db= getDb();
            const collection= db.collection('users');
            return await collection.findOne({email,password});
        }catch(err){
            console.log(err);
            throw(err);
        }
    }


    async findByEmail(email){
        try{
            const db= getDb();
            const collection= db.collection('users');
            return await collection.findOne({email});
        }catch(err){
            console.log(err);
            throw(err);
        }
    }
}