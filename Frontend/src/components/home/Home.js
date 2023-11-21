import React, { useState, useEffect } from "react";
import { Cards } from "../displayComponents/Cards";

var apigClientFactory = require("aws-api-gateway-client").default;

function ScrollableCardRow({ children }) {
  return <div className="d-flex flex-nowrap overflow-auto">{children}</div>;
}

function Home(props) {
  const [upcoming, setUpcoming] = useState(null);
  

  useEffect(() => {
    var uni = localStorage.getItem("uni");
    var apigClient = apigClientFactory.newClient({ invokeUrl: props.url });
    var pathTemplate = "/homepage";
    var pathParams = {};
    var method = "GET";
    var body = {};
    var additionalParams = { headers: {user_id :uni}, queryParams: {} };
    apigClient
      .invokeApi(pathParams, pathTemplate, method, additionalParams, body)
      .then(function (result) {
        console.log(result.data.body)
        setUpcoming((result.data.body));
      })
      .catch(function (error) {
        setUpcoming([{
          'id' : '12rkjbnacijld', 
          'title' : 'AWS System Design',
          'img_url' : "https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/102017/logo_0.png?17TK91b1B6OvV2MFrCLfukw1c8oEaNr6&itok=vsanFiUj",
          'location' : 'Uris Hall', 
          'time' : '6:30 pm', 
          'numPeople': 2,
          'type' : 'Event',
      }])
        console.log(error);
      });
  }, [props.url]);

  const Component = () => {
    if (upcoming !== null) {
      return upcoming.map((item) => (
        <Cards
          key={item.activity_id}
          cardId={item.activity_id}
          title={item.title}
          img_url={item.img_url}
          location={item.location}
          time={item.datetime}
          numPeople={item.attendees.length}
          type={item.category}
        />
      ));
    } else return <></>;
  };

  return (
    <>
      <br />
      <h1>Upcoming</h1>
      <br />
      <ScrollableCardRow>{Component()}</ScrollableCardRow>
    </>
  );
}

export default Home;
