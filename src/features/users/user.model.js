import { getDb } from "../../config/mongodb.js";

export default class UserModel{
    constructor(name,email,password,type,id){
        this.name=name;
        this.email=email;
        this.password=password;
        this.type=type;
        this._id=id;
    }
     
    static getAll(){
        return users;
    }
}
let users=[
    {
        id:1,
        name:"Seller User",
        email:"seller@gmail.com",
        password:"1234",
        type: "seller"
    },
    {
        id:2,
        name:"Customer",
        email:"customer@gmail.com",
        password:"4321",
        type:"customer"
    }

]