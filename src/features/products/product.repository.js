import { get } from "mongoose";
import { getDb } from "../../config/mongodb.js";
import { ObjectId } from "mongodb";

export default class ProductRepository{
    constructor(){
        this.collection="products";
    }

   async add(newProduct){
    try{
        const db= getDb();
        const collection= db.collection(this.collection);
        await collection.insertOne(newProduct);
        return newProduct;
    }catch(err){
        console.log(err);
        throw(err);

    }
   }

   async getAll(){
    try{
        const db= getDb();
        const collection= db.collection(this.collection);
        const products= await collection.find().toArray();
        console.log(products);
        return products;
    }catch(err){
        console.log(err);
        throw (err);
    }
   }

   async get(id){
    try{
        const db = getDB();
        const collection = db.collection(this.collection);
        
    }catch(err){
        console.log(err);
        throw(err);
    }
}

async filter(minPrice,maxPrice,category){
    try{
        const db = getDB();
        const collection = db.collection(this.collection);
        let filterExpression={};
        if(minPrice){
            filterExpression.price = {$gte: parseFloat(minPrice)}
        }
        if(maxPrice){
            filterExpression.price = {...filterExpression.price, $lte: parseFloat(maxPrice)}
        }
        if(category){
            filterExpression.category=category;
        }
        return await collection.find(filterExpression).toArray();
        
    }catch(err){
        console.log(err);
        throw(err);
    }

}
async rate(userID, productID, rating){
    try{
        const db = getDB();
        const collection = db.collection(this.collection);
        await collection.updateOne({
            _id:new ObjectId(productID)
        },{
            $pull: {ratings: {userID:new ObjectId(userID)}}
        })
       
        await collection.updateOne({
            _id:new ObjectId(productID)
        },{
            $push: {ratings: {userID:new ObjectId(userID), rating}}
        })
       

        

    }catch(err){
        console.log(err);
        throw new ApplicationError("Something went wrong with database", 500);
    }
}
async avgproductPricePerCategory(){
    try{
        const db= getDb();
        await db.collection(this.collection)
        .aggregate([
            {
                $group:{
                    _id:"$category",
                    averagePrice:{
                        $avg:"$price"
                    }
                }
            }
        ]).toArray();
        



    }catch(err){
        console.log(err);
        throw new ApplicationError("Something went wrong with database", 500);
    }
}





}