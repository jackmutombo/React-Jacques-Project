import StaffProductAPI from '../../apis/StaffProductAPI';
import qs from "qs";
// import {Redirect} from "react-router-dom";


export default async function PostData(userData){
    
const requestBody = qs.stringify({
    grant_type: "password",
    username: userData.username,
    password: userData.password
  });

    try {
        const response = await StaffProductAPI.post("/Token", requestBody, {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
            }
          })
          console.log(response.data.access_token)
          sessionStorage.setItem('userData', response.data.access_token);
        //   <Redirect to="/"/>

    } catch (error) {
        console.log("error");
    }
  ;
//    return response
}