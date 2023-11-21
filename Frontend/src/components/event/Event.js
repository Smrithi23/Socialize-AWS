import React from "react";
import { Cards, PollingCards } from "../displayComponents/Cards";

function getUpcomingData() {
  var uni = localStorage.getItem("uni");
  var upcoming = [
    {
      id: "12rkjbnacijld",
      title: "AWS System Design",
      img_url:
        "https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/102017/logo_0.png?17TK91b1B6OvV2MFrCLfukw1c8oEaNr6&itok=vsanFiUj",
      location: "Uris Hall",
      time: "6:30 pm",
      numPeople: "2",
      type: "Event",
    },
    {
      id: "12rkjbnacijld",
      title: "AWS System Design",
      img_url:
        "https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/102017/logo_0.png?17TK91b1B6OvV2MFrCLfukw1c8oEaNr6&itok=vsanFiUj",
      location: "Uris Hall",
      time: "6:30 pm",
      numPeople: "2",
      type: "Event",
    },
    {
      id: "12rkjbnacijld",
      title: "AWS System Design",
      img_url:
        "https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/102017/logo_0.png?17TK91b1B6OvV2MFrCLfukw1c8oEaNr6&itok=vsanFiUj",
      location: "Uris Hall",
      time: "6:30 pm",
      numPeople: "2",
      type: "Event",
    },
    {
      id: "12rkjbnacijld",
      title: "AWS System Design",
      img_url:
        "https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/102017/logo_0.png?17TK91b1B6OvV2MFrCLfukw1c8oEaNr6&itok=vsanFiUj",
      location: "Uris Hall",
      time: "6:30 pm",
      numPeople: "2",
      type: "Event",
    },
  ];

  const component = upcoming.map((item) => {
    return (
      <Cards
        id={item.id}
        title={item.title}
        img_url={item.img_url}
        location={item.location}
        time={item.time}
        numPeople={item.numPeople}
        type={item.type}
      />
    );
  });
  return component;
}

function getPollingData() {
  var polling = [
    {
      id: "12rkjbnacijld",
      title: "AWS System Design",
      img_url:
        "https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/102017/logo_0.png?17TK91b1B6OvV2MFrCLfukw1c8oEaNr6&itok=vsanFiUj",
      location: "Uris Hall",
      time: "6:30 pm",
      numPeople: "2",
      type: "Event",
    },
    {
      id: "12rkjbnacijld",
      title: "AWS System Design",
      img_url:
        "https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/102017/logo_0.png?17TK91b1B6OvV2MFrCLfukw1c8oEaNr6&itok=vsanFiUj",
      location: "Uris Hall",
      time: "6:30 pm",
      numPeople: "2",
      type: "Event",
    },
    {
      id: "12rkjbnacijld",
      title: "AWS System Design",
      img_url:
        "https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/102017/logo_0.png?17TK91b1B6OvV2MFrCLfukw1c8oEaNr6&itok=vsanFiUj",
      location: "Uris Hall",
      time: "6:30 pm",
      numPeople: "2",
      type: "Event",
    },
    {
      id: "12rkjbnacijld",
      title: "AWS System Design",
      img_url:
        "https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/102017/logo_0.png?17TK91b1B6OvV2MFrCLfukw1c8oEaNr6&itok=vsanFiUj",
      location: "Uris Hall",
      time: "6:30 pm",
      numPeople: "2",
      type: "Event",
    },
  ];

  const component = polling.map((item) => {
    return (
      <PollingCards
        id={item.id}
        title={item.title}
        img_url={item.img_url}
        numPeople={item.numPeople}
        type={item.type}
      />
    );
  });
  return component;
}

function ScrollableCardRow({ children }) {
  return <div className="d-flex flex-nowrap overflow-auto">{children}</div>;
}

function Event() {
  return (
    <div className="">
      <br />
      <h1>Event</h1>
      <br />
      <h3>Happening Soon</h3>
      <ScrollableCardRow>{getUpcomingData()}</ScrollableCardRow>
      <br />
      <h3>Currently Polling</h3>
      <ScrollableCardRow>{getPollingData()}</ScrollableCardRow>
    </div>
  );
}

export default Event;
