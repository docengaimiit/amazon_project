import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProductsFetch} from "../data/products.js";
// import '../data/cart-class.js';
//import '../data/backend-practice.js'

async function loadPage() {
    
    await loadProductsFetch();
    
    renderOrderSummary();
    renderPaymentSummary();
};

loadPage();


// loadProductsFetch().then(()=>{
//     renderOrderSummary();
//     renderPaymentSummary();
// });

// new Promise((resolve) =>{
//     loadProducts(()=>{
//         resolve();
//     })
// })
// .then(()=>{
//     renderOrderSummary();
//     renderPaymentSummary();
// })
// .catch(()=>{
//     console.log("Unexpected error occured");
// })

// loadProducts(() => {
//     renderOrderSummary();
//      renderPaymentSummary();
// })
