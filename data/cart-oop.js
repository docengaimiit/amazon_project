function Cart(localStorageKey){
    const cart={

        cartItems: undefined,
    
        loadFromStorage(){
            this.cartItems=JSON.parse(localStorage.getItem(localStorageKey));
            if(!this.cartItems){
                this.cartItems=[];
            }
        },
    
        saveToStorage(){
            localStorage.setItem(localStorageKey,JSON.stringify(this.cartItems));
        },
    
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
        },
    
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
        },
    
        calculateQuantity(){
            let cartQuantity=0;
    
            this.cartItems.forEach((cartItem) =>{
            cartQuantity+=cartItem.quantity;
        })
            return cartQuantity;
        },
    
        updateQuantity(productId,newQuantity){
            this.cartItems.forEach((cartItem)=>{
            if(cartItem.productId === productId)
                cartItem.quantity = newQuantity;
            })
            this.saveToStorage();
        },
    
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
    };
    return cart;
}

const cart=Cart('cart-oop');

  cart.loadFromStorage();
     
  cart.addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6",3);
  console.log(cart);