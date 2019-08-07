import React, { Component } from "react";
import { storeProducts, detailProduct } from "./data";

const ProductContext = React.createContext();
//Provider
//Consumer

class ProductProvider extends Component {
  state = {
    products: [],
    detailProduct: detailProduct,
    cart: [],
    cardTotal: 0,
    authenticated : false,
    EmailAddress: '',
    token : ''
  };
  componentDidMount() {
    this.setProducts();
  }

  setProducts = () => {
    let tempProducts = [];

    storeProducts.forEach(item => {
      const singleItem = { ...item };
      tempProducts = [...tempProducts, singleItem];
    });
    this.setState(() => {
      return { products: tempProducts };
    });
  };

  getItem = id => {
    const product = this.state.products.find(item => item.id === id);
    return product;
  };

  handleDetail = id => {
    const product = this.getItem(id);
    this.setState(() => {
      return { detailProduct: product };
    });
  };
 

  addToCart = id => {

    console.log("add car!");
    // let tempProducts = [...this.state.products];
    // const index = tempProducts.indexOf(this.getItem(id));
    // const product = tempProducts[index];
    // product.inCart = true;
    // product.count = 1;
    // const price = product.price;
    // product.total = price;
    // this.setState(
    //   () => {
    //     return { products: tempProducts, cart: [...this.state.cart, product] };
    //   },
    //   () => {
    //     this.addTotals();
    //   }
    // );
  };
  increment = id => {
    let tempCart = [...this.state.cart];
    const selectedProduct = tempCart.find(item=>item.id=== id)
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];
    product.count = product.count + 1;
    product.total = product.count * product.price;
    this.setState(() =>{
        return{
            cart:[...tempCart]
        }
    }, () => {this.addTotals()});
  };
  decrement = id => {
   
    let tempCart = [...this.state.cart];
    const selectedProduct = tempCart.find(item=>item.id=== id)
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];

    product.count = product.count - 1;
    if(product.count === 0){
        this.removeItem(id);
    }else{
        product.total = product.count * product.price; 
    }
    this.setState(() =>{
        return{
            cart:[...tempCart]
        }
    }, () => {this.addTotals()});

  };
  removeItem = id => {
        let tempProducts = [...this.state.products];
        let tempCart = [...this.state.cart];
        tempCart = tempCart.filter(item => item.id !== id);

        const index = tempProducts.indexOf(this.getItem(id));
        let removeProduct = tempProducts[index];
        removeProduct.inCart = false;
        removeProduct.count = 0;
        removeProduct.total = 0;
        this.setState(() =>{
            return {
                cart: [...tempCart],
                products: [...tempProducts]
            }
        }, () =>{
            this.addToCart();
        })
  };
 
  clearCart = () => {
    this.setState(()=>{
        return{cart:[]}
    }, () =>{
        this.setProducts();
        this.addTotals();
    })
}
  addTotals = () => {
    let total = 0;
    this.state.cart.map(item => (total += item.total));
    this.setState(() => {
      return {
        cardTotal: total
      };
    });
  };
  login (){
       console.log("login worked!");
  }
  render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          handleDetail: this.handleDetail,
          addToCart: this.addToCart,
          increment: this.increment,
          decrement: this.decrement,
          removeItem: this.removeItem,
          clearCart: this.clearCart,
          authenticated: this.authenticated,
          login: this.login
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
