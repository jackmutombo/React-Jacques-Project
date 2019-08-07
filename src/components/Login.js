import React, { Component } from "react";
import LoginAuth from "./LoginAuth";
import { ProductConsumer } from "../context";

export default class Login extends Component {
  render() {
    return (
      <ProductConsumer>
        {value => {
          const { login } = value;
          return (
            <React.Fragment>
              <LoginAuth Login={login} />
            </React.Fragment>
          );
        }}
      </ProductConsumer>
    );
  }
}
