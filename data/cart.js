export let cart;

loadFromStorage();

function loadFromStorage(){
  cart=JSON.parse(localStorage.getItem('cart'));
  if(!cart){
    cart=[];
  }
}

export function saveToStorage(){
  localStorage.setItem('cart',JSON.stringify(cart));
}
export function addToCart(productId,selectedQuantity){
    let matchItem;
  
    cart.forEach((cartItem) =>{
      if(cartItem.productId === productId)
        {
          matchItem=cartItem;
        }
    });
    
    if(matchItem){
        matchItem.quantity+=selectedQuantity;            
    }
    else{  
        cart.push({
        productId:productId,
        quantity:selectedQuantity,
        deliveryOptionId: '1'
    });
    }
  
    saveToStorage();
  }

 export function removeFromCart(productId){
  const newCart=[];

  cart.forEach((cartItem) =>{
    if(cartItem.productId !== productId)
     {
      newCart.push(cartItem);
     }
  })

  cart = newCart;
  saveToStorage();
  }

  export function calculateQuantity(){
    let cartQuantity=0;

    cart.forEach((cartItem) =>{
    cartQuantity+=cartItem.quantity;
  })
    return cartQuantity;
  }

  export function updateQuantity(productId,newQuantity){
    cart.forEach((cartItem)=>{
      if(cartItem.productId === productId)
        cartItem.quantity = newQuantity;
    })
    saveToStorage();
  }

 export function updateDeliveryOption(productId,deliveryOptionId){
    let matchingItem;
    
    cart.forEach((cartItem) =>{
      if (cartItem.productId === productId) {
        matchingItem = cartItem;
      }
    });
    console.log(deliveryOptionId);
    matchingItem.deliveryOptionId = deliveryOptionId;
    console.log(cart);
    saveToStorage();
  }