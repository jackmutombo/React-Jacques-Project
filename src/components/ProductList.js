import React, { Component } from "react";
import Product from "./Product";
import Title from "./Title";
import { ProductConsumer } from "../context";

export class ProductList extends Component {
  state = {};
  render() {
    console.log(this.state.products);
    return (
      <React.Fragment>
        <div className="py-5">
          <div className="container">
            <div className="row">
              <section>
              <Title title="Products" />
              <div className="row">
                <ProductConsumer>
                  {value => {
                    return value.products.map(product => {
                      return <Product key={product.id} product={product} />;
                    });
                  }}
                </ProductConsumer>
              </div>
              </section>
             {/* <h1> Product</h1> */}
             

              
            </div>
          </div>
        </div>
      </React.Fragment>

      // <Product />
    );
  }
}
export default ProductList;
