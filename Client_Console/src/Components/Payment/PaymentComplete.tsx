import { useState, useEffect } from "react";

import { emptyCart } from "../../Storage/redux/shoppingCartSlice";
import axios from "axios";


function PaymentComplete(props) {

    
    const token = localStorage.getItem("token");
    const orderNumber = localStorage.getItem("orderNumber")

    useEffect(() => {
        const updateOrder = async () => {
            
            const response = await axios.post(`/api/user/order/success`, {orderNumber : orderNumber}, {
                headers: {
                  'Content-Type': 'application/json',
                  token: token
                }
            });
            const data = await response.data;
            console.log(data)
            localStorage.removeItem("orderNumber");
        };
        
        updateOrder();
       
    }, []);

    

    









    return <h1>Than You for your payment</h1>
}

export default PaymentComplete;