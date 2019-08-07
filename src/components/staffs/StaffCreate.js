import React from 'react';
import { Link } from 'react-router-dom';
import qs from 'qs';
import image from "../../image/singular.png";
import StaffProductAPI from '../../apis/StaffProductAPI';
import tokenAPI from '../../apis/tokenAPI';
// import axios from 'axios';
import './StaffCreate.css';
const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form error being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false)
  });

  return valid;
}

const PostData = async (state) => {
  console.log(state);
  // delete axios.defaults.headers.common["Authorization"];
  const loginToken = qs.stringify({
    'grant_type': 'password',
    'username': state.email,
    'password': state.password
  })
  // axios.delete()
  // StaffProductAPI.setBaseURL('http://localhost:44358');
  const responseToken = await tokenAPI.post('/Token', loginToken, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  });

  // const url = 'http://localhost:54413/Token';

  // const response =  axios({
  //     url: url,
  //     method: 'post',
  // headers: {
  //     'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  // },
  //     data: requestBody
  // });

  // console.log(response);





  // delete axios.defaults.headers.common["Authorization"];
  console.log(responseToken.data.access_token);
  console.log(responseToken.data.userName);

  const requestBody2 = qs.stringify({

    'FirstName': state.firstName,
    'LastName': state.lastName,
    'EmailAddress': state.email,
    'CellPhone': state.cellphone,
  
    "Address": {
      'Type': state.addressType,
      'AddressName': state.address,
      'Street': state.street,
      'Suburb': state.suburb,
      'City': state.city,
      'PostalCode': state.postalCode
    }
  });
  // delete axios.defaults.headers.common["Authorization"];
  await StaffProductAPI.post('/api/User', requestBody2, {
    headers: {
      'Authorization': `Bearer ${responseToken.data.access_token}`
    }
  })

}



class StaffCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: null,
      lastName: null,
      email: null,
      cellphone: null,
      password: null,
      username: null,
      address: null,
      street: null,
      suburb: null,
      city: null,
      postalCode: null,
      addressType: null,
      formErrors: {
        firstName: "",
        lastName: "",
        email: "",
        cellphone: "",
        username: "",
        password: "",
        address: "",
        street: "",
        suburb: "",
        city: "",
        postalCode: "",
        addressType: ""
      }
    };
  }

  handleSubmit = async e => {
    e.preventDefault();
    if (formValid(this.state)) {
      console.log(`
          ---SUBMITTING----
          First Name: ${this.state.firstName}
          Last Name: ${this.state.lastName}
          Email: ${this.state.email}
          Password: ${this.state.password}
          Address: ${this.state.address}
          Street: ${this.state.street}
          Suburb: ${this.state.suburb}
          City: ${this.state.city}
          PostalCode: ${this.state.postalCode}
          Address Type:${this.state.addressType}
          `)

      const requestBody = qs.stringify({
        'Email': this.state.email,
        'Password': this.state.password,
        'ConfirmPassword': this.state.password
      })
      console.log(requestBody)
      await StaffProductAPI.post('/api/Account/Register', requestBody)
        .then(response => {
          console.log(response.status);
          console.log(response.statusText);
          // Create the user details here

          PostData(this.state);


        }, (error) => {
          // TODO display to the user the error
          console.log(error, "error")
        })

    } else {
      console.error('FORM INVALID ');
    }
  };
  // TODO: case for username not there and check the correct spelling to the error
  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = this.state.formErrors;
    console.log(name, value)
    switch (name) {
      case 'firstName':
        formErrors.firstName = value.length < 3 ? 'minimum three characaters required' : "";
        break;

      case 'lastName':
        formErrors.lastName = value.length < 3 ? 'minimum three characaters required' : "";
        break;

      case 'email':
        formErrors.email = emailRegex.test(value) ? "" : 'inavlid email address';
        break;
      case 'password':
        formErrors.password = value.length < 8 ? 'minimum 8 characaters required' : "";
        break;

      case 'address':
        formErrors.address = value.length < 3 ? 'minimum three characaters required' : "";
        break;

      case 'street':
        formErrors.street = value.length < 3 ? 'minimum three characaters required' : "";
        break;
      case 'suburb':
        formErrors.suburb = value.length < 3 ? 'minimum three characaters required' : "";
        break;

      case 'city':
        formErrors.city = value.length < 3 ? 'minimum three characaters required' : "";
        break;

      case 'postalCode':
        formErrors.postalCode = value.length < 3 ? 'minimum three characaters required' : "";
        break;
      case 'addressType':
        formErrors.addressType = value === 0 ? 'Select address type' : "";
        break;
      default:
        break;
    }
    this.setState({ formErrors, [name]: value }, () => console.log(this.state))
  }

  render() {
    const { formErrors} = this.state;
    return (
      <div className="wrapper">

        <div className="logo">
          <img src={image} alt="singularLogo" />
        </div>
        <div className="form-wrapper">
          <strong className="title">Create Account</strong>
          <form
            onSubmit={this.handleSubmit}
            noValidate>
            <div className="firstName">
              <label htmlFor="firstName"><strong>First Name</strong></label>
              <input
                className={formErrors.firstName.length > 0 ? "error" : null}
                id="firstName"
                placeholder="First Name"
                type="text"
                name="firstName"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.firstName.length > 0 && (
                <span className="errorMessage">{formErrors.firstName}</span>
              )}
            </div>
            <div className="lastName">
              <label htmlFor="lastName"><strong>Last Name</strong></label>
              <input
                className={formErrors.lastName.length > 0 ? "error" : null}
                id="lastName"
                placeholder="Last Name"
                type="text"
                name="lastName"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.lastName.length > 0 && (
                <span className="errorMessage">{formErrors.lastName}</span>
              )}
            </div>

            <div className="email">
              <label htmlFor="email"><strong>Email Address</strong></label>
              <input
                className={formErrors.email.length > 0 ? "error" : null}
                id="email"
                placeholder="Email Address"
                type="email"
                name="email"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.email.length > 0 && (
                <span className="errorMessage">{formErrors.email}</span>
              )}
            </div>

            <div className="cellphone">
              <label htmlFor="cellphone"><strong>Phone No</strong></label>
              <input
                className={formErrors.cellphone.length > 0 ? "error" : null}
                id="cellphone"
                placeholder="Phone o"
                type="text"
                name="cellphone"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.cellphone.length > 0 && (
                <span className="errorMessage">{formErrors.cellphone}</span>
              )}
            </div>

            <div className="username">
              <label htmlFor="username"><strong>Username</strong></label>
              <input
                className={formErrors.username.length > 0 ? "error" : null}
                id="username"
                placeholder="Username"
                type="text"
                name="username"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.username.length > 0 && (
                <span className="errorMessage">{formErrors.username}</span>
              )}
            </div>

            <div className="password">
              <label htmlFor="password"><strong>Password</strong></label>
              <input
                className={formErrors.password.length > 0 ? "error" : null}
                type="password"
                id="password"
                placeholder="Password"

                name="password"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.password.length > 0 && (
                <span className="errorMessage">{formErrors.password}</span>
              )}
            </div>

            <div className="address">
              <label htmlFor="address"><strong>Address</strong></label>
              <input
                className={formErrors.address.length > 0 ? "error" : null}
                id="address"
                placeholder="Address"
                type="text"
                name="address"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.address.length > 0 && (
                <span className="errorMessage">{formErrors.address}</span>
              )}
            </div>

            <div className="street">
              <label htmlFor="street"><strong>Street</strong></label>
              <input
                className={formErrors.street.length > 0 ? "error" : null}
                id="street"
                placeholder="Street"
                type="text"
                name="street"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.street.length > 0 && (
                <span className="errorMessage">{formErrors.street}</span>
              )}
            </div>


            <div className="suburb">
              <label htmlFor="suburb"><strong>Suburb</strong></label>
              <input
                className={formErrors.suburb.length > 0 ? "error" : null}
                id="suburb"
                placeholder="Suburb"
                type="text"
                name="suburb"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.suburb.length > 0 && (
                <span className="errorMessage">{formErrors.suburb}</span>
              )}
            </div>

            <div className="city">
              <label htmlFor="city"><strong>City</strong></label>
              <input
                className={formErrors.city.length > 0 ? "error" : null}
                id="city"
                placeholder="City"
                type="text"
                name="city"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.city.length > 0 && (
                <span className="errorMessage">{formErrors.city}</span>
              )}
            </div>

            <div className="postalCode">
              <label htmlFor="postalCode"><strong>Postal Code</strong></label>
              <input
                className={formErrors.postalCode.length > 0 ? "error" : null}
                id="postalCode"
                placeholder="Postal Code"
                type="text"
                name="postalCode"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.postalCode.length > 0 && (
                <span className="errorMessage">{formErrors.postalCode}</span>
              )}
            </div>

            <div className="postalCode">
              <label htmlFor="residential"><strong>Residential</strong></label>
              <input
                className={formErrors.addressType.length > 0 ? "error" : null}
                type="radio"
                defaultChecked={this.state.addressType === "residential"}
                value="residential"
                name="addressType"
                noValidate
                onChange={this.handleChange}
              />

            </div>
            <div className="postalCode">
              <label htmlFor="business"><strong>Business</strong></label>
              <input
                className={formErrors.addressType.length > 0 ? "error" : null}
                defaultChecked={this.state.addressType === "business"}
                type="radio"
                name="addressType"
                value="business"
                noValidate
                onChange={this.handleChange}
              />
            </div>
            <div>
              {formErrors.postalCode.length > 0 && (
                <span className="errorMessage">{formErrors.postalCode}</span>
              )}
            </div>
            <div className="createAccount">
              <button type="submit"><strong>Create Account</strong></button>
              <Link to="/login"><small><strong>Already have an Account?</strong></small></Link>
            </div>

          </form>
        </div>
      </div>
    );
  }
}


export default StaffCreate;