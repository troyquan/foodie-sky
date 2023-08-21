import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from './CheckoutForm'



const Payment: React.FC = (props) => {
    const token = localStorage.getItem("token");

    const [stripePromise, setStripePromise] = useState<Promise<any> | null>(null);
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    // const { cartItems, calculateTotalPrice } = useShoppingCart();

    useEffect(() => {
        setStripePromise(loadStripe('pk_test_uLqE8g4L4z8znlY6lcSKINLk'));
    }, []);
    

    useEffect(() => {
        const fetchData = async () => {
            // get clientSecret
            const response = await fetch('/api/user/order/pay', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    token: token
                },
                // body: JSON.stringify({ cartItems }),
            });
            const data = await response.json();
            console.log(data);
            setClientSecret(data.data);
        };
        
        fetchData();
    }, []);

    return (
        <>
            
            {stripePromise && clientSecret && (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CheckoutForm />
                </Elements>
            )}
        </>
    )
}

export default Payment;
