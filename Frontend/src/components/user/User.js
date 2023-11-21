import React, {useState, useEffect} from "react";
import "./user.css";

/*
function fetchUserDetails() {
  var uni = localStorage.getItem("uni");
  var data = {
    name: "John Doe",
    uni: "jd1234",
    emailid: "jd1234@columbia.edu",
    location: "Brooklyn",
    phoneNum: "+16461234567",
    interests: ["Tech", "Writing"],
  };
  return data;
}*/


var apigClientFactory = require("aws-api-gateway-client").default;
function fetchUserDetails(setData, url) {
  var uni = localStorage.getItem("uni");
  var apigClient = apigClientFactory.newClient({ invokeUrl: url });
  var pathTemplate = "/profile";
  var pathParams = {};
  var method = "GET";
  var body = { };
  var additionalParams = { headers: { user_id: uni }, queryParams: {} };
  apigClient
    .invokeApi(pathParams, pathTemplate, method, additionalParams, body)
    .then(function (result) {
      console.log("submitted:", result.data.body);
      var res = JSON.parse(result.data.body)
      console.log(res.interest)
      setData({
        'name' : res.name, 
        'location' :res.location,
        'uni' : res.uni,
        'phoneNum' : res.phoneno,
        'interests' : res.interest,
        'emailid' :res.emailId 
      })
      
    })
    .catch(function (error) {
      console.log("Error:", error);
    });
}

function User(props) {
  console.log(props.url)
  
  var [data, setData] = useState({
    name: "",
    uni: "",
    emailid: "",
    location: "",
    phoneNum: "",
    interests: ['']
  })

  useEffect(() => {
    fetchUserDetails(setData, props.url);
  }, [props.url]);

  return (
    <div className="">
      <br />
      <h1>Profile</h1>
      <br />
      <div className="row detail">
        <div className="col-2"><b>Name</b> </div>
        <div className="col-3">{data.name}</div>
      </div>
      <div className="row detail">
        <div className="col-2"><b>Uni</b></div>
        <div className="col-3">{data.uni}</div>
      </div>
      <div className="row detail">
        <div className="col-2"><b>Email ID</b></div>
        <div className="col-3">{data.emailid}</div>
      </div>
      <div className="row detail"> 
        <div className="col-2"><b>Location</b></div>
        <div className="col-3">{data.location}</div>
      </div>
      <div className="row detail">
        <div className="col-2"> <b>Phone Num</b> </div>
        <div className="col-3">{data.phoneNum}</div>
      </div>
      <div className="row detail">
        <div className="col-2"> <b>Interest</b> </div>
        <div className="col-3" id="interests">{data.interests.map((interest, index) => (
        <button type='button' className="btn btn-outline-primary" style={{marginRight:"5px"}}key={index}>{interest}</button>
      ))}</div>
      </div>
      <button type="button" className="btn btn-primary">Edit</button>
    </div>
  );
}

export default User;
