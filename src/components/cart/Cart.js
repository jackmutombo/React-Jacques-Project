import React, { Component } from "react";
import Title from "../Title";
import CartColumns from "./CartColumns";
import EmtyCart from "./EmtyCart";
import { ProductConsumer } from "../../context";
import CartList from './CartList';
import CartTotals from './CartTotals';


class Cart extends Component {
  render() {
    return (
      <section>
        <ProductConsumer>
          {value => {
            const { cart } = value;
            if (cart.length > 0) {
              return (
                <React.Fragment>
                  <Title name="Your Cart" />
                  <CartColumns />
                  <CartList value={value} />
                  <CartTotals value={value}/>
                </React.Fragment>
              );
            }else{
               return(
                <EmtyCart />
               )
            }
          }}
        </ProductConsumer>

        
      </section>
    );
  }
}

export default Cart;
