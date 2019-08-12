import React from "react";
import { Switch, Route } from "react-router-dom";
import { ProductConsumer } from "../context";
import ProductListAPI from './ProductAPI/ProductListAPI';
// import ProductCreate from "./products/ProductCreate";
// import ProductEdit from "./products/ProductEdit";
// import ProductDelete from "./products/ProductDelete";
import StaffCreate from "./staffs/StaffCreate";
// import LoginAuth from "./LoginAuth";
// import Header from "./Header";

import Navbar from "./Navbar";
import ProductList from "./ProductList";
import ProductDetails from "./ProductDetails";
import Cart from "./cart/Cart";
import Default from "./Default";
import Login from './Login';

import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
const App = () => {
  return (
    <React.Fragment>
      <Navbar />
      <Switch>
        <Route path="/account" component={StaffCreate} />
        <Route path="/login" exact component={Login} />

        <ProductConsumer>
          {value => {
            // const { authenticated } = value;
            if (sessionStorage.getItem('userData')) {
              return (
                <React.Fragment>
                  <Route path="/product" exact component={ProductList} />
                  <Route path="/productAPI" exact component={ProductListAPI} />
                  <Route path="/details" exact component={ProductDetails} />
                  <Route path="/cart" exact component={Cart} />
                  {/* <Route component={Default} /> */}
                </React.Fragment>
              );
            }
          }}
        </ProductConsumer>
      </Switch>
    </React.Fragment>
  );
};

export default App;


  /* <BrowserRouter>
                <div>
                 <Header />
                    <Route path="/" exact component={ProductList} />
                    <Route path="/products/new" exact component={ProductCreate} />
                    <Route path="/products/edit" exact component={ProductEdit} />
                    <Route path="/products/delete" exact component={ProductDelete} />
                    <Route path="/staffs/new" exact component={StaffCreate} />
                    <Route path="/login" exact component={LoginAuth} />
                </div>
            </BrowserRouter> */

