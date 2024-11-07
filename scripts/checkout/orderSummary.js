import {cart,removeFromCart,calculateQuantity,updateQuantity, updateDeliveryOption} from '../../data/cart.js'
import {getProduct} from '../../data/products.js'
import {deliveryOptions,getDeliveryOption, calculateDeliveryDate} from '../../data/deliveryOptions.js'
import { formatCurrency } from '../utils/money.js'
import { renderPaymentSummary } from './paymentSummary.js'

export function renderOrderSummary(){

    updateCartQuantity();
    let cartSummaryHTML='';
    cart.forEach((cartItem) =>{

        const productId = cartItem.productId;
        const deliveryOptionId = cartItem.deliveryOptionId;
        
        const matchingProduct=getProduct(productId);        

        const deliveryOption = getDeliveryOption(deliveryOptionId);
        const dateString = calculateDeliveryDate(deliveryOption);

        cartSummaryHTML+=`
        <div class="cart-item-container js-cart-item-container-${productId}">
            <div class="delivery-date">
                Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
                <img class="product-image"
                src="${matchingProduct.image}">

                <div class="cart-item-details">
                <div class="product-name">
                    ${matchingProduct.name}
                </div>
                <div class="product-price">
                    ${matchingProduct.getPrice()}
                </div>
                <div class="product-quantity">
                    <span>
                    Quantity: <span class="quantity-label js-quantity-label-${productId}">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary js-update-link" data-product-id="${productId}">
                    Update
                    </span>
                    <input class="quantity-input js-quantity-input-${productId}" type="number" value="${cartItem.quantity}">
                    <span class="save-quantity-link link-primary js-save-quantity-link" data-product-id=${productId}>
                    Save
                    </span>
                    <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${productId}" >
                    Delete
                    </span>
                </div>
                </div>

                <div class="delivery-options">
                <div class="delivery-options-title">
                    Choose a delivery option:
                </div>
                    ${deliveryOptionsHTML(matchingProduct,cartItem)}
                
                </div>
            </div>
        </div>
        `;
    })

    function deliveryOptionsHTML(matchingProduct,cartItem){
        let html='';
        deliveryOptions.forEach((deliveryOption)=>{
            
            const dateString = calculateDeliveryDate(deliveryOption);
            
            const priceString = deliveryOption.priceCents === 0 
            ? 'FREE':`$${formatCurrency(deliveryOption.priceCents)}`;

    const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

            html+=
            `
            <div class="delivery-option js-delivery-option"
            data-product-id='${matchingProduct.id}' data-delivery-option-id="${deliveryOption.id}">
                <input type="radio"
                ${isChecked?'checked':''}
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}">
                <div>
                <div class="delivery-option-date">
                    ${dateString}
                </div>
                <div class="delivery-option-price">
                    ${priceString} - Shipping
                </div>
                </div>
                </div>
            `;
        });

        return html;
    }

    document.querySelector('.js-order-summary').innerHTML=cartSummaryHTML;

    document.querySelectorAll('.js-delete-link').forEach((link)=>{
        link.addEventListener('click',()=>{
            const productId = link.dataset.productId;
            removeFromCart(productId);
            renderOrderSummary();
            renderPaymentSummary();
        });
    });
    function updateCartQuantity(){
        
        const cartQuantity = calculateQuantity();
        document.querySelector('.js-return-to-home-link').innerHTML=`${cartQuantity} items`;
    }

    document.querySelectorAll('.js-update-link').forEach((link) =>{
        const productId = link.dataset.productId;
        link.addEventListener('click',()=>{
            document.querySelector(`.js-cart-item-container-${productId}`).classList.add('is-editing-quantity');
        });
    });

    function validateNewQuantity(productId,newQuantity){
        if(newQuantity<=0 || newQuantity>1000)
        {
            if (newQuantity === 0){
                removeFromCart(productId);
                document.querySelector(`.js-cart-item-container-${productId}`).remove();
                return false;
            }
            else{alert('Not a valid quantity');
            return false;   
            } 
        }
        else
            return true;
    }

    document.querySelectorAll('.js-save-quantity-link').forEach((link) =>{
        const productId = link.dataset.productId;
        link.addEventListener('click',()=>{
            const newQuantity = Number(document.querySelector(`.js-quantity-input-${productId}`).value);
            document.querySelector(`.js-cart-item-container-${productId}`).classList.remove('is-editing-quantity');

            if(validateNewQuantity(productId,newQuantity)){
                updateQuantity(productId,newQuantity);
                
                // document.querySelector(`.js-quantity-label-${productId}`).innerHTML=newQuantity;
            }
            // updateCartQuantity();
            renderOrderSummary();
            renderPaymentSummary();
        });
    });

    document.querySelectorAll('.js-delivery-option').forEach((option)=>{
        option.addEventListener('click',()=>{
            const {productId,deliveryOptionId} = option.dataset;
            updateDeliveryOption(productId,deliveryOptionId);
            renderOrderSummary();
            renderPaymentSummary();
        })
    });
}
