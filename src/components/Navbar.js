import React from "react";
import { Link } from "react-router-dom";
import image from '../image/singularGlobe.png';
import styled from "styled-components";
import { ButtonContaier } from "./Button";
import "./Navbar.css";
class Navbar extends React.Component {
  render() {
    return (
      <NavWrapper className="navbar navbar-expand-sm navbar-dark px-sm-5">
        {
          //    https://www.iconfinder.com/icons/1243689/call_phone_icon
          //    Creative Commons (Attribution 3.0 Unported);
          //    https://www.iconfinder.com/Makoto_msk
        }
        <Link to="/">
          <img src={image} alt="store" className="navbar-brand" />
        </Link>
        <ul className="navbar-nav align-items-center">
          <li className="nav-item ml-5" />
          <Link to="/product" className="navigatorTitle">
            Products
          </Link>
          <li className="nav-item ml-5" />
          <Link to="/login" id="navigatorTitle"className="navigatorTitle">
            {!sessionStorage.getItem('userData')?"Login":"Logout"}
            
          </Link>
          <li className="nav-item ml-5" />
          <Link to="/account" className="navigatorTitle">
            Register
          </Link>
        </ul>

        <Link to="/cart" className="ml-auto">
          <ButtonContaier>
            <span className="mr-9">
              <i className="fas fa-cart-plus" />
            </span>
            {"  "}my cart
          </ButtonContaier>
        </Link>
      </NavWrapper>
    );
  }
}
export default Navbar;

const NavWrapper = styled.nav`
  background: var(--mainBlue);
  .nav-link {
    color: var(--mainWhite) !import;
    font-size: 1.3rem;
    text-transform: capitalize;
  }
`;

