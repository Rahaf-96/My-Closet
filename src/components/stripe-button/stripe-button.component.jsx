import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import hanger from '../../assets/hanger.svg';
const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    'pk_test_51HS28qIxJ7iMf361pKaX4dBdSuJdZlB6EcSGHAq5mD73DaKZmtV4wgRvmLo0IyveQYr0Xp5x4MelSj0IRV7lG4QN00XwNFACLm';

  const onToken = (token) => {
    console.log(token);
    alert('Payment done Successfuly');
  };

  return (
    <StripeCheckout
      label='Pay Now'
      name='My closet Clothing Ltd.'
      billingAddress
      shippingAddress
      image={hanger}
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
