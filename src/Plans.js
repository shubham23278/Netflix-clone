import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, subscribe } from './features/userSlice';

import db from './firebase';
import Loader from "react-loader-spinner";

import { loadStripe } from '@stripe/stripe-js'
import './Plans.css';
function Plans() {
    const [products, setProducts] = useState([]);
    // const [subscription, setSubscription] = useState(null);
    const [loading, setLoading] = useState(false);
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    const loadCheckout = async (priceId) => {
        setLoading(true);
        const docRef = await db.collection('customers')
            .doc(user.uid)
            .collection('checkout_sessions')
            .add({
                price: priceId,
                success_url: window.location.origin,
                cancel_url: window.location.origin
            });

        docRef.onSnapshot(async (snap) => {
            const { error, sessionId } = snap.data();

            if (error) {
                // Show an error to your customer and
                // inspect your cloud funcition logs in te firebase console.
                alert(`An error occured: ${error.message}`);
                setLoading(false)
            }

            if (sessionId) {
                // We have a session, let's redirect to Checkout
                // Init Stripe
                const stripe = await loadStripe('pk_test_51J4jZFSCwxDCOlGCF3zAIfbPfD1ibM5HMtyxBnmrASm3tQbszQsZjOdtJwUqYKYdf0931SKLn99FnTXeDMyPrpmi00BP4qOptL');
                stripe.redirectToCheckout({ sessionId });
                setLoading(false);
            }
        })
    }

    useEffect(() => {
        db.collection('customers')
            .doc(user.uid)
            .collection('subscriptions')
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(async subscription => {
                    dispatch(subscribe({
                        role: subscription.data().role,
                        current_period_end: subscription.data().current_period_end.seconds,
                        current_period_start: subscription.data().current_period_start.seconds
                    }))
                })
            })
    }, [user.uid, dispatch])

    useEffect(() => {
        setLoading(true);
        db.collection('products')
            .where('active', '==', true)
            .get()
            .then(querySnapshot => {
                const products = {}
                querySnapshot.forEach(async (productDoc) => {
                    products[productDoc.id] = productDoc.data();
                    const priceSnap = await productDoc.ref.collection('prices').get();
                    priceSnap.docs.forEach(price => {
                        products[productDoc.id].prices = {
                            priceId: price.id,
                            priceData: price.data()
                        }
                    })
                })
                setProducts(products);
                setLoading(false);
            })
    }, []);


    return (
        <div className="plans">
            {loading ?
            <div className="plans__loader">
                <Loader
                    type="TailSpin"
                    color=" #e50914"
                    height={120}
                    width={120}
                />
                </div>
                :
                <>
                {Object.entries(products).map(([productId, productData]) => {
                    const isCurrentPackage = productData.name?.toLowerCase().includes(user.subscription?.role.toLowerCase());
                    return (
                        <div className="plan" key={productId}>
                            <div className="plan__name">
                                <p>{productData.name}</p>
                                <small>{productData.description}</small>
                            </div>
                            
                                <button className={isCurrentPackage ? 'plan__current' : 'plan__subscribe'} onClick={() => !isCurrentPackage && loadCheckout(productData.prices.priceId)}>
                                    {isCurrentPackage ? 'Current Package' : 'Subscribe'}
                                </button>
                            
                        </div>
                    )
                })}    
                </>
            }
        </div>
    )
}

export default Plans;