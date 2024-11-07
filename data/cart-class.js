class Cart{
    
    cartItems;
    #localStorageKey;

    constructor(localStorageKey){
        this.#localStorageKey = localStorageKey;
        this.#loadFromStorage();
    }

    #loadFromStorage(){
        this.cartItems=JSON.parse(localStorage.getItem(this.#localStorageKey));
        if(!this.cartItems){
            this.cartItems=[];
        }
    }

    saveToStorage(){
        localStorage.setItem(this.#localStorageKey,JSON.stringify(this.cartItems));
    }

    addToCart(productId,selectedQuantity){
        let matchItem;
    
        this.cartItems.forEach((cartItem) =>{
        if(cartItem.productId === productId)
            {
            matchItem=cartItem;
            }
        });
        
        if(matchItem){
            matchItem.quantity+=selectedQuantity;            
        }
        else{  
            this.cartItems.push({
            productId:productId,
            quantity:selectedQuantity,
            deliveryOptionId: '1'
        });
        }
    
        this.saveToStorage();
    }

    removeFromCart(productId){
    const newCart=[];

    this.cartItems.forEach((cartItem) =>{
        if(cartItem.productId !== productId)
        {
        newCart.push(cartItem);
        }
    })

    this.cartItems = newCart;
    this.saveToStorage();
    }

    calculateQuantity(){
        let cartQuantity=0;

        this.cartItems.forEach((cartItem) =>{
        cartQuantity+=cartItem.quantity;
    })
        return cartQuantity;
    }

    updateQuantity(productId,newQuantity){
        this.cartItems.forEach((cartItem)=>{
        if(cartItem.productId === productId)
            cartItem.quantity = newQuantity;
        })
        this.saveToStorage();
    }

    updateDeliveryOption(productId,deliveryOptionId){
        let matchingItem;
        
        this.cartItems.forEach((cartItem) =>{
        if (cartItem.productId === productId) {
            matchingItem = cartItem;
        }
        });
        console.log(deliveryOptionId);
        matchingItem.deliveryOptionId = deliveryOptionId;
        this.saveToStorage();
    }
}

const cart = new Cart('cart');
console.log(cart);

