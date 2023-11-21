import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

var apigClientFactory = require("aws-api-gateway-client").default;
function register(activity_id, url) {
  console.log('asjbk');
  var uni = localStorage.getItem("uni");
  var apigClient = apigClientFactory.newClient({ invokeUrl: url });
  var pathTemplate = "/activity/register";
  var pathParams = {};
  var method = "POST";
  var body = {
    activity_id: "f5e57133-edf0-494f-a6eb-51043d1c95fb",
  };
  var additionalParams = { headers: { user_id: uni }, queryParams: {} };
  apigClient
    .invokeApi(pathParams, pathTemplate, method, additionalParams, body)
    .then(function (result) {
      console.log("submitted:", result);
    })
    .catch(function (error) {
      console.log("Error:", error);
    });
}

function getData(type, id, setDetails, url) {
  var uni = localStorage.getItem("uni");
  var apigClient = apigClientFactory.newClient({ invokeUrl: url });
  type = type.toLowerCase();
  var pathTemplate = "/activity/" + id;
  var pathParams = {};
  var method = "GET";
  var body = {};
  var additionalParams = { headers: { user_id: uni }, queryParams: {} };
  apigClient
    .invokeApi(pathParams, pathTemplate, method, additionalParams, body)
    .then(function (result) {
      console.log(result.data.body);
      setDetails(result.data.body);
    })
    .catch(function (error) {
      console.log(error);
    });
  setDetails([
    {
      id: "12rkjbnacijld",
      title: "AWS System Design",
      img_url:
        "https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/102017/logo_0.png?17TK91b1B6OvV2MFrCLfukw1c8oEaNr6&itok=vsanFiUj",
      location: "Uris Hall",
      time: "6:30 pm",
      numPeople: 2,
      type: "Meetup",
    },
  ]);
}

function Specifc(props) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const type = queryParams.get("type");

  const [details, setDetails] = useState({});

  useEffect(() => {
    getData(type, id, setDetails, props.url);
  }, [props.url, type, id]);

  return (
    <div>
      <br />
      <div className="row align-items-center">
        <div className="col-4 offset-1 text-center">
          {/*<img
            src={details.img_url}
            className="card-img-top mx-auto"
            alt="card logo"
            style={{ width: "50%" }}
  />*/}
          <h2>{details.title}</h2>
          <div className="row ">
            <div className="col-6">
              <i className="fa-regular fa-clock" /> {details.datetime}
            </div>
            <div className="col-6">
              <i className="fa-solid fa-location-dot" /> {details.location}
            </div>
          </div>
          <br />
        </div>
        <div className="col-2 offset-4 ">
          <button
            className="btn btn-primary"
            onClick={() => register(id, props.url)}
          >
            Register
          </button>
        </div>
      </div>
      <br />
      <h2>Details</h2>
      {details.description}
    </div>
  );
}
export default Specifc;
