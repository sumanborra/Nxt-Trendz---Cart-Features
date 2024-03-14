// Write your code here
import CartContext from '../../context/CartContext'

import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value

      const totalAmout = cartList
        .map(each => each.price * each.quantity)
        .reduce((a, b) => (a = a + b))
      console.log(totalAmout)
      return (
        <div className="cart-summary-container">
          <h1 className="total-orders-text">
            Order Total:{' '}
            <span className="span-text-order-total">Rs {totalAmout}/-</span>
          </h1>
          <p className="items-count-text">{cartList.length} Items in cart</p>
          <button type="button" className="buttn">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)
export default CartSummary
