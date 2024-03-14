import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const update = cartList.map(each => {
      if (each.id === id) {
        return {
          availability: each.availability,
          brand: each.brand,
          description: each.description,
          id: each.id,
          imageUrl: each.imageUrl,
          price: each.price,
          quantity: each.quantity + 1,
          rating: each.rating,
          title: each.title,
          totalReviews: each.totalReviews,
        }
      } else {
        return {
          availability: each.availability,
          brand: each.brand,
          description: each.description,
          id: each.id,
          imageUrl: each.imageUrl,
          price: each.price,
          quantity: each.quantity,
          rating: each.rating,
          title: each.title,
          totalReviews: each.totalReviews,
        }
      }
    })
    this.setState(prevState => ({cartList: update}))
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const update = cartList.map(each => {
      if (each.id === id) {
        return {
          availability: each.availability,
          brand: each.brand,
          description: each.description,
          id: each.id,
          imageUrl: each.imageUrl,
          price: each.price,
          quantity: each.quantity - 1,
          rating: each.rating,
          title: each.title,
          totalReviews: each.totalReviews,
        }
      } else {
        return {
          availability: each.availability,
          brand: each.brand,
          description: each.description,
          id: each.id,
          imageUrl: each.imageUrl,
          price: each.price,
          quantity: each.quantity,
          rating: each.rating,
          title: each.title,
          totalReviews: each.totalReviews,
        }
      }
    })
    this.setState(prevState => ({cartList: update}))
    this.setState(prevState => ({
      cartList: prevState.cartList.filter(each => each.quantity !== 0),
    }))
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const update = cartList.filter(each => each.id !== id)
    console.log(cartList)
    this.setState({cartList: update})
  }

  addCartItem = product => {
    const {cartList} = this.state

    const isProductThere = cartList.find(each => each.id === product.id)
    console.log(isProductThere)
    if (isProductThere === undefined) {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    } else if (isProductThere !== undefined) {
      const update = cartList.map(each => {
        if (each.id === product.id) {
          return {
            availability: each.availability,
            brand: each.brand,
            description: each.description,
            id: each.id,
            imageUrl: each.imageUrl,
            price: each.price,
            quantity: each.quantity + product.quantity,
            rating: each.rating,
            title: each.title,
            totalReviews: each.totalReviews,
          }
        } else {
          return {
            availability: each.availability,
            brand: each.brand,
            description: each.description,
            id: each.id,
            imageUrl: each.imageUrl,
            price: each.price,
            quantity: each.quantity,
            rating: each.rating,
            title: each.title,
            totalReviews: each.totalReviews,
          }
        }
      })
      this.setState({cartList: update})
    }

    //   TODO: Update the code here to implement addCartItem
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
