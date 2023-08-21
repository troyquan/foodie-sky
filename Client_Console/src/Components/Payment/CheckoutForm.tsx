import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";

// import './CheckoutForm.module.scss';





export default function CheckoutForm(props) {

    
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();
    
    // const totalPrice = calculateTotalPrice();
    

    const [message, setMessage] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        setIsProcessing(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page
               
                return_url: `${window.location.origin}/PaymentComplete`,
            },
        });
        
        console.log(error)
       
        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message);
            navigate("/checkout");
        } else {
            setMessage("An unexpected error occured.");
            navigate("/checkout");
        }
        

        setIsProcessing(false);
    };

    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <PaymentElement id="payment-element" className="form-control" />
            </div>
            <button className="primary" disabled={isProcessing || !stripe || !elements} id="submit">
                <span id="button-text">
                    {isProcessing ? "Processing ... " : "Pay now"}
                </span>
            </button>
            {message && <div id="payment-message">{message}</div>}
        </form>
    );
}
