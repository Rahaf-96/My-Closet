import React from 'react';
import { connect } from 'react-redux';
import { removeItemFromCart } from '../../redux/cart/cart.actions';
import './checkout-item.styles.scss';

const CheckoutItem = ({ cartItem, removeItemFromCart }) => {
  const { name, imageUrl, price, quantity } = cartItem;

  return (
    <div className='checkout-item'>
      <div className='image-container'>
        <img src={imageUrl} alt='item' />
      </div>
      <span className='name'>{name}</span>
      <span className='quantity'>{quantity}</span>

      <span className='price'>{price}</span>
      <div
        className='remove-button'
        onClick={() => removeItemFromCart(cartItem)}
      >
        &#10005;
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  removeItemFromCart: (item) => dispatch(removeItemFromCart(item)),
});
export default connect(null, mapDispatchToProps)(CheckoutItem);
