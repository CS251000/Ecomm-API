
export default class CartItemModel{
    constructor(id,productID,userID,quantity){
        this.id=id;
        this.productID=productID;
        this.userID=userID;
        this.quantity=quantity;
    }
    static add(productID,userID,quantity){
        const cartItem= new CartItemModel(productID,userID,quantity);
        cartItem.id= cartItems.length+1;
        cartItems.push(cartItem);
        return cartItem;
    }
    static get(userID){
        return cartItems.filter(u=>u.id==userID);
    }
    static delete(cartItemID,userID){
        const cartItemIndex= cartItems.findIndex(
            (i)=>i.id==cartItemID && i.userID==userID
            );
        if(!cartItemIndex==-1){
            return 'item not found';
        }else{
            cartItems.splice(cartItemIndex,1);

        }

    }
}

var cartItems=[
    new CartItemModel(1,1,2,1),
    new CartItemModel(2,1,1,2),
];