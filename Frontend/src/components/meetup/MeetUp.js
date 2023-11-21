import React, { useState, useEffect } from "react";
import { Cards, PollingCards } from "../displayComponents/Cards";

var apigClientFactory = require("aws-api-gateway-client").default;

function ScrollableCardRow({ children }) {
  return <div className="d-flex flex-nowrap overflow-auto">{children}</div>;
}

function getUpcomingData(upcoming, setUpcoming, url) {
  var uni = localStorage.getItem("uni");
  var apigClient = apigClientFactory.newClient({ invokeUrl: url });
  var pathTemplate = "/meetup/all";
  var pathParams = {};
  var method = "GET";
  var body = {};
  var additionalParams = { headers: {userid :uni}, queryParams: {} };
  apigClient
    .invokeApi(pathParams, pathTemplate, method, additionalParams, body)
    .then(function (result) {
      setUpcoming(JSON.parse(result.data.body));
    })
    .catch(function (error) {
      setUpcoming([{
        'id' : '12rkjbnacijld', 
        'title' : 'AWS System Design',
        'img_url' : "https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/102017/logo_0.png?17TK91b1B6OvV2MFrCLfukw1c8oEaNr6&itok=vsanFiUj",
        'location' : 'Uris Hall', 
        'time' : '6:30 pm', 
        'numPeople': 2,
        'type' : 'Meetup',
    }])
      console.log(error);
    });
}

function getPollingData(polling, setPolling, url) {
  var apigClient = apigClientFactory.newClient({ invokeUrl: url });
  var pathTemplate = "/meetup/all";
  var pathParams = {};
  var method = "GET";
  var body = {};
  var additionalParams = { headers: {}, queryParams: {} };
  apigClient
    .invokeApi(pathParams, pathTemplate, method, additionalParams, body)
    .then(function (result) {
      setPolling(JSON.parse(result.data.body));
    })
    .catch(function (error) {
      setPolling([{
        'id' : '12rkjbnacijld', 
        'title' : 'AWS System Design',
        'img_url' : "https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/102017/logo_0.png?17TK91b1B6OvV2MFrCLfukw1c8oEaNr6&itok=vsanFiUj",
        'location' : 'Uris Hall', 
        'time' : '6:30 pm', 
        'numPeople': 2,
        'type' : 'Meetup',
    }])
      console.log(error);
    });
}

function MeetUp(props) {
  const [upcoming, setUpcoming] = useState(null);
  const [polling, setPolling] = useState(null);

  const Polling = () => {
    if (polling !== null) {
      return upcoming.map((item) => (
        <PollingCards
          key={item.id}
          pollingId={item.id}
          title={item.title}
          img_url={item.img_url}
          numPeople={item.numPeople}
          type={item.type}
        />
      ));
    } else return <></>;
  };

  const Upcoming = () => {
    if (upcoming !== null) {
      return upcoming.map((item) => (
        <Cards
          key={item.id}
          cardId={item.id}
          title={item.title}
          img_url={item.img_url}
          location={item.location}
          time={item.time}
          numPeople={item.numPeople}
          type={item.type}
          url={props.url}
        />
      ));
    } else return <></>;
  };

  useEffect(() => {
    getUpcomingData(upcoming, setUpcoming, props.url);
    getPollingData(polling, setPolling, props.url);
  }, [props.url]);
  return (
    <div className="">
      <br />
      <h1>Meet Up</h1>
      <br />
      <h3>Happening Soon</h3>
      <ScrollableCardRow>{Upcoming()}</ScrollableCardRow>
      <br />
      <h3>Currently Polling</h3>
      <ScrollableCardRow>{Polling()}</ScrollableCardRow>
    </div>
  );
}

export default MeetUp;
