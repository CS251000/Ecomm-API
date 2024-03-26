import { MongoClient } from "mongodb";
const url= "mongodb://localhost:27017/ecomdb";
let client;
export const connectToMongoDB= ()=>{
    MongoClient.connect(url)
    .then(clientInstance=>{
        client=clientInstance ;
        console.log('mongodb is connected');
    })
    .catch(err=>{
        console.log(err);
    })
}

export const getDb=()=>{
    return client.db(); 


}


export default connectToMongoDB;