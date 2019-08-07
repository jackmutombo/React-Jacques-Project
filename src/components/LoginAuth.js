import React from "react";
import { Link } from "react-router-dom";
import image from "../image/singular.png";
import "../components/staffs/StaffCreate.css";
import StaffProductAPI from "../apis/StaffProductAPI";
import { ProductConsumer } from "../context";
import qs from "qs";
import PostData from "../components/services/PostData";
// import {Redirect} from "react-router-dom";

const formValid = ({ formErrors, ...rest }) => {
  // let valid = true;

//   // validate form error being empty
//   Object.values(formErrors).forEach(val => {
//     val.length > 0 && (valid = false);
//   });

//   // validate the form was filled out
// //   Object.values(rest).forEach(val => {
// //     val === null && (valid = false);
//   });

//   return valid;
};

class LoginAuth2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null,
      redirect: false
    };
    this.loginin = this.loginin.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  // componentDidMount(){

  // }

  handleSubmit = async e => {
    e.preventDefault();
    if (!formValid(this.state)) {
      const requestBody = qs.stringify({
        grant_type: "password",
        username: this.state.username,
        password: this.state.password, 
        redirect: false
      });

      try {
          console.log(this.state);
        const response = await StaffProductAPI.post("/Token", requestBody, {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
            }
          });
          console.log(response.data.access_token);
          console.log(response.data.userName);
          this.setState(() => {
            return {
              token: response.data.access_token
            };
          });
          this.setState({redirect: true})
          sessionStorage.setItem('userData', response.data.access_token);
      } catch (error) {
          console.log("error")
      }

     

      // const getUserData = await StaffProductAPI.get('/api/User', {
      //     headers: {
      //         'Authorization': `Bearer ${response.data.access_token}`
      //     }
      // })
      // console.log(getUserData, "response");

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
    } else {
      console.error("FORM INVALID");
    }
  };
logout(){
    sessionStorage.setItem('userData',"");
    sessionStorage.clear();
}

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    // let formErrors = this.state.formErrors;
    // switch (name) {
    //   case "username":
    //     formErrors.username = value.length < 1 ? "Empty username" : "";
    //     break;
    //   case "password":
    //     formErrors.password = value.length < 1 ? "Empty password" : "";
    //     break;
    //   default:
    //     break;
    // }
    // this.setState({ formErrors, [name]: value }, () => console.log(this.state));
    this.setState({  [name]: value }, () => console.log(this.state));
  };

  loginin() {
    //   console.log(this.state);
    PostData(this.state)
    // .then((result)=>{
    //     let responseJSON = result;
    //     console.log(responseJSON.data.access_token)
    //     if(responseJSON.token){
    //         sessionStorage.setItem('userData', responseJSON.data.access_token);
    //         this.setState({redirect: true});
    //     }else{
    //         console.log("Login error")
    //     }
    // })
  }

  componentDidMount(){
    // sessionStorage.setItem('userData',"");
    // sessionStorage.clear();
    //   if(sessionStorage.getItem('userData')){
    //     this.logout();
    //       console.log('User logged in')
    //   }else{
    //      this.setState({redirect: true});
    //   }
  }
  render() {
      // if(this.state.redirect ){
      //   console.log("Entere");
      //     return(<Redirect to={"/product"}/>)
      // }
      //  if(sessionStorage.getItem('userData') === null){
      //      console.log("true here");
      //   return(<Redirect to={"/login"}/>)
      // }
      // if(sessionStorage.getItem('userData')){
      //     return(<Redirect to={"/product"}/>)
      // }
    // const { formErrors, login, addToCart } = this.state;
    // const {login, addToCart } = this.state;
    // const id = 2;
    return (
      <div className="wrapper">
        <div className="logo">
          <img src={image} alt="singularLogo" />
        </div>
        <div className="form-wrapper">
          <strong className="title">Login</strong>
          {/* <LoginAuth2 token ={this.state.token}/> */}
          {/* <form onSubmit={this.handleSubmit} noValidate> */}
          <section className="form2">
            <div className="username">
              <label htmlFor="username">
                <strong>Username</strong>
              </label>
              <input
                // className={formErrors.username.length > 0 ? "error" : null}
                id="username"
                placeholder="Username"
                name="username"
                noValidate
                onChange={this.handleChange}
              />
              {/* {formErrors.username.length > 0 && (
                <span className="errorMessage">{formErrors.username}</span>
              )} */}
            </div>
            <div className="password">
              <label htmlFor="password">
                <strong>Password</strong>
              </label>
              <input
                // className={formErrors.password.length > 0 ? "error" : null}
                id="password"
                placeholder="Password"
                type="password"
                name="password"
                noValidate
                onChange={this.handleChange}
              />
              {/* {formErrors.password.length > 0 && (
                <span className="errorMessage">{formErrors.password}</span>
              )} */}
            </div>
            <div className="createAccount">
              <button type="submit" onClick={this.handleSubmit}>
                <strong>Login</strong>
              </button>
              <Link to="/staffs/new">
                <small>
                  <strong>Don't have an Account?</strong>
                </small>
              </Link>
            </div>
          </section>
          {/* </form> */}
        </div>
      </div>
    );
  }
}

// export default LoginAuth;

export default class LoginAuth extends React.Component {
  render() {
    // const{token} = this.props;
    // console.log(token)
    return (
      <ProductConsumer>
        {value => {
          const { Login, addToCart } = value;
          return <LoginAuth2 login={Login} addToCart={addToCart} />;
        }}
      </ProductConsumer>
      // <LoginAuth2 />
    );
  }
}

// constructor(props) {
//     super(props);
//     this.state = {
//         username: null,
//         password: null,
//         formErrors: {
//             username: "",
//             password: ""
//         }
//     };
// }
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
