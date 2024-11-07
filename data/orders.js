import { formatCurrency } from "../scripts/utils/money.js";
import { getProduct } from "./products.js";
import dayjs  from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { loadProductsFetch } from "./products.js";
import { calculateQuantity } from "./cart.js";
export const orders = JSON.parse(localStorage.getItem('order')) || [];

export function addOrder(order){
    orders.unshift(order);
    saveToStorage();
}

function saveToStorage(){
    localStorage.setItem('order',JSON.stringify(orders));
}

function convertDate(estimateDate){
    const isoDateString = estimateDate;  //orders[0].products[0].estimatedDeliveryTime;'2024-08-07T15:25:47.880Z';
    const formattedDate = dayjs(isoDateString).format('MMMM D');
    return formattedDate;
}


let ordersHtml='';
async function generateOrderHTML(){
    await loadProductsFetch();
    orders.forEach((order) => {

        let productHTML='';
        order.products.forEach((product) => {
            
            const matchingProduct = getProduct(product.productId);

            productHTML+=
            `
             <div class="product-image-container">
              <img src="${matchingProduct.image}">
            </div>

            <div class="product-details">
              <div class="product-name">
                ${matchingProduct.name}
              </div>
              <div class="product-delivery-date">
                Arriving on: ${convertDate(product.estimatedDeliveryTime)}
              </div>
              <div class="product-quantity">
                Quantity: ${product.quantity}
              </div>
              <button class="buy-again-button button-primary">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>
            `
        });

        ordersHtml+=
        `
    <div class="order-container">
          
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${convertDate(order.orderTime)}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${formatCurrency(order.totalCostCents)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${order.id}</div>
            </div>
          </div>

          <div class="order-details-grid">
           ${productHTML}
          </div>
        </div>
    `
    });
    document.querySelector('.js-orders-grid').innerHTML = ordersHtml;
    document.querySelector('.js-cart-quantity').innerHTML=calculateQuantity();
};
generateOrderHTML();