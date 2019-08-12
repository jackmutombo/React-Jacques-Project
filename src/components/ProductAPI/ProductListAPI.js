import React, { Component } from "react";
import StaffProductAPI from "../../apis/StaffProductAPI"
import Product from "./Product";
import Title from "../Title";
import { ProductConsumer } from "../../context";

export class ProductListAPI extends Component {
  state = {
    productAPI:[]
  };
  componentDidMount(){
    this.getData();
  }
  getData= async() =>{

    const getProductData = await StaffProductAPI.get('/api/product', {
      headers: {
          // 'Authorization': `Bearer ${response.data.access_token}`             
          'Authorization': `Bearer ${sessionStorage.getItem('userData')}`
      }    
  })
  // console.log(getProductData.data, "response");
  this.setState({productAPI : getProductData.data})
  }
  render() {
    // console.log(this.state.productAPI.Id, "HAHAHHAHAHA");
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
                    return value.productAPI.map(product => {
                      // console.log(product.ProductID,"poroduct");
                      // console.log(product.ProductName,"poroduct");
                      return <Product key={product.ProductID} product={product} />;
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
export default ProductListAPI;
