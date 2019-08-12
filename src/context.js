import React, { Component } from "react";
import { storeProducts, detailProduct } from "./data";
import StaffProductAPI from './apis/StaffProductAPI';

const ProductContext = React.createContext();
//Provider
//Consumer

class ProductProvider extends Component {
  state = {
    products: [],
    productAPI:[],
    user: null,
    detailProduct: detailProduct,
    cart: [],
    cardTotal: 0,
    authenticated : false,
    EmailAddress: '',
    token : ''
  };
  componentDidMount() {
    this.getAPIUserAndProducts();
    this.setProducts();
  }

  getAPIUserAndProducts = async() => {
      console.log(sessionStorage.getItem('userData'));
      const token = 'nXpurYDqZW8m52gI81Mc2jQSnb7vyG_NeoRRDWW8dkVIVsU_ZoTgiqypuYRLCodLRfi_34tmW13SdQMYkE39Q0l8tLxun5CqxJ-pwsrwsCU-RkvucPurRAU5CbMS6ULHf-Ebn2cfrxzsXOynORHS8-nCJuehgYEqVvWYxFNm7_dCNM23EZ1hjVD6A8YDvpMWbJbZa29G1bYGB2-ycDGpC5wbpc_jgFl8Laoqb5V5m0y21ISnMMcmWtEdZztcg7XcdGm72FFGgssvnKIXiQW3121z_lC9ACvs1pD4eh23LsK0t8PhzOQhYB63v8lWjSxSEzZd4LNLaXkFFCEndeZnPhrCpSbaJlmlzBodzJNLW2y4vH8wCeQZ8LrhOz2Tz0-WHaur5C0Yv-khunHmtQW-ccutmEm9aw3y4XwbiNVLPi-I3pa5B18TSRLa8xPw20QdkJHCX-6qZz-D1mNQZumrsz9IEjdcFHKXhWHehsYY75lXSJbWGj0jqh8nzfSVWP9l';
      const getUserData = await StaffProductAPI.get('/api/User', {
          headers: {
              // 'Authorization': `Bearer ${response.data.access_token}`             
              'Authorization': `Bearer ${sessionStorage.getItem('userData')}`
          }
      })
      // console.log(getUserData.data, "response");
      this.setState({user : getUserData.data});
      // this.setState(() =>{
      //   return {user : getUserData.data};
      // });
      console.log(this.state.user)
      const getProductData = await StaffProductAPI.get('/api/product', {
        headers: {
            // 'Authorization': `Bearer ${response.data.access_token}`             
            'Authorization': `Bearer ${sessionStorage.getItem('userData')}`
        }    
    })
    console.log(getProductData.data, "response");
    this.setState({productAPI : getProductData.data})
      
      // const product = qs.stringify({

      //     'ProductName': "Steak",
      //     'Description': "sirlon Steak",
      //     'Price': "50",
      //     // 'Image': state.cellphone,
      // });

      // const create = await StaffProductAPI.post('/api/Product', product, {
      //     headers: {
      //         'Authorization': `Bearer ${response.data.access_token}`
      //     }
      // })
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
    let tempProducts = [...this.state.products];
    const index = tempProducts.indexOf(this.getItem(id));
    const product = tempProducts[index];
    product.inCart = true;
    product.count = 1;
    const price = product.price;
    product.total = price;
    this.setState(
      () => {
        return { products: tempProducts, cart: [...this.state.cart, product] };
      },
      () => {
        this.addTotals();
      }
    );
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
          login: this.login,
          getAPIProducts: this.getAPIProducts
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
