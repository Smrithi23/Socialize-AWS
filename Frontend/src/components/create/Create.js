import React, { useState } from "react";

var apigClientFactory = require("aws-api-gateway-client").default;

function Create(props) {
  const [formData, setFormData] = useState({
    category: "",
    name: "",
    description: "",
    poll: false,
  });

  const [time, setTime] = useState("");
  const [timeArray, setTimeArray] = useState([]);

  const [location, setLocation] = useState("");
  const [locationArray, setLocationArray] = useState([]);

  const [date, setDate] = useState("");
  const [dateArray, setDateArray] = useState([]);

  const TimeComponent = () => {
    if (timeArray !== null) {
      return timeArray.map((item, index) => (
        <div className="col-1" key={item}>
          <button
            className="btn btn-outline-secondary"
            onClick={() => handleRemoveTime(index)}
          >
            {item}{" "}
          </button>
        </div>
      ));
    } else return <></>;
  };

  const LocationComponent = () => {
    if (locationArray !== null) {
      return locationArray.map((item, index) => (
        <div className="col-2" key={item}>
          <button
            className="btn btn-outline-secondary"
            onClick={() => handleRemoveLocation(index)}
          >
            {item}{" "}
          </button>
        </div>
      ));
    } else return <></>;
  };

  const DateComponent = () => {
    if (dateArray !== null) {
      return dateArray.map((item, index) => (
        <div className="col-2" key={item}>
          <button
            className="btn btn-outline-secondary"
            onClick={() => handleRemoveDate(index)}
          >
            {item}{" "}
          </button>
        </div>
      ));
    } else return <></>;
  };

  const handleChange = (event) => {
    var { name, value, type, checked } = event.target;
    name = event.target.id;
    value = type === "checkbox" ? checked : value;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleRemoveTime = (index) => {
    const updatedTimeArray = [...timeArray];
    updatedTimeArray.splice(index, 1);
    setTimeArray(updatedTimeArray);
  };

  const handleRemoveDate = (index) => {
    const updatedDaterray = [...dateArray];
    updatedDaterray.splice(index, 1);
    setDateArray(updatedDaterray);
  };

  const handleRemoveLocation = (index) => {
    const updatedLocationArray = [...locationArray];
    updatedLocationArray.splice(index, 1);
    setLocationArray(updatedLocationArray);
  };

  const handleTimeArray = (event) => {
    event.preventDefault();

    if (time.trim() !== "") {
      var val = time.trim().replace(" ", "");
      setTimeArray([...timeArray, val]);
      setTime("");
    }
  };

  const handleDateArray = (event) => {
    event.preventDefault();

    if (date.trim() !== "") {
      var val = date.trim().replace(" ", "");
      if (!dateArray.includes(val)) {
        setDateArray([...dateArray, val]);
      }
      setDate("");
    }
  };

  const handleLocationArray = (event) => {
    event.preventDefault();

    if (location.trim() !== "") {
      var val = location.trim();
      setLocationArray([...locationArray, val]);
      setLocation("");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    var category_validation = formData.category !== "";
    var timeArray_validation = timeArray.length > 0;
    var locationArray_validation = locationArray.length > 0;
    var dateArray_validation = dateArray.length > 0;

    if (
      category_validation &&
      timeArray_validation &&
      locationArray_validation &&
      dateArray_validation
    ) {
      if (formData.poll === false) {
        if (timeArray.length > 1) {
          alert(
            "It seems you are trying to add more than 1 time but its not a poll. Either mark it as poll or choose one time"
          );
        }
        if (locationArray.length > 1) {
          alert(
            "It seems you are trying to add more than 1 location but its not a poll. Either mark it as poll or choose one location"
          );
        }
        if (dateArray.length > 1) {
          alert(
            "It seems you are trying to add more than 1 date but its not a poll. Either mark it as poll or choose one date"
          );
        } else {
          console.log("Submit", dateArray, formData);
          var uni = localStorage.getItem("uni");
          var apigClient = apigClientFactory.newClient({ invokeUrl: props.url });
          var pathTemplate = "/create/activity";
          var pathParams = {};
          var method = "POST";
          var body = {
            title: formData.name,
            description: formData.description,
            date : dateArray[0], 
            time: '13:55:00',
            location: locationArray[0], 
            category: formData.category

          };
          var additionalParams = { headers: { user_id: uni, 'Content-Type':'application/json' }, queryParams: {} };
          apigClient
            .invokeApi(pathParams, pathTemplate, method, additionalParams, body)
            .then(function (result) {
              console.log("submitted:", result)
            })
            .catch(function (error) {
              console.log("Error:", error);
            });
        }
      }
    } else {
      if (category_validation === false) alert("Please select a category");
      else if (timeArray_validation === false)
        alert("Please add at least 1 time");
      else if (locationArray_validation === false)
        alert("Please add at least 1 location");
      else if (dateArray_validation === false)
        alert("Please add at least 1 date");
      console.log("Error with form");
    }
  };

  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];

  return (
    <div>
      <h1>Create</h1>
      <br />
      <form onSubmit={handleSubmit}>
        <div className="form-group row">
          <label htmlFor="category" className="col-2 col-form-label">
            Category
          </label>
          <div className="col-10">
            <select
              id="category"
              className="form-control"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value={null}>Choose...</option>
              <option value="Meetup">Meetup</option>
              <option value="Event">Event</option>
              <option value="Study Group">Study Group</option>
            </select>
          </div>
        </div>
        <br />
        <div className="form-group row">
          <label htmlFor="name" className="col-2 col-form-label">
            Name
          </label>
          <br />
          <div className="col-10">
            <input
              type="text"
              className="form-control"
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter the name"
              required
            />
          </div>
        </div>
        <br />
        <div className="form-group row">
          <label htmlFor="description" className="col-2 col-form-label">
            Description
          </label>
          <br />
          <div className="col-10">
            <input
              type="text"
              className="form-control"
              id="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter description"
              required
            />
          </div>
        </div>
        <br />
        <div className="form-group row">
          <label htmlFor="polls" className="col-2 col-form-label">
            Polls
          </label>
          <br />
          <div className="col-10">
            <input
              type="checkbox"
              className="form-control form-check-input"
              id="poll"
              checked={formData.poll}
              onChange={handleChange}
            />
            Check if this is a poll
          </div>
        </div>
        <br />
        <div className="form-group row">
          <label htmlFor="time " className="col-2 col-form-label">
            Time:
          </label>
          <div className="col-5">
            <input
              type="text"
              className="form-control"
              id="time"
              value={time}
              onChange={handleTimeChange}
              placeholder="e.g., 6:30 pm"
            />
          </div>
          <div className="col-2">
            <button className="btn btn-secondary" onClick={handleTimeArray}>
              Add
            </button>
          </div>
        </div>
        <br />
        <div className="row">{TimeComponent()}</div>
        <br />

        <div className="form-group row">
          <label htmlFor="location " className="col-2 col-form-label">
            Location:
          </label>
          <div className="col-5">
            <input
              type="text"
              className="form-control"
              id="location"
              value={location}
              onChange={handleLocationChange}
              placeholder="e.g., Uris Hall"
            />
          </div>
          <div className="col-2">
            <button className="btn btn-secondary" onClick={handleLocationArray}>
              Add
            </button>
          </div>
        </div>
        <br />
        <div className="row">{LocationComponent()}</div>
        <br />

        <div className="form-group row">
          <label htmlFor="date " className="col-2 col-form-label">
            Date:
          </label>
          <div className="col-5">
            <input
              type="date"
              className="form-control"
              id="date"
              value={date}
              onChange={handleDateChange}
              min={formattedDate}
            />
          </div>
          <div className="col-2">
            <button className="btn btn-secondary" onClick={handleDateArray}>
              Add
            </button>
          </div>
        </div>
        <br />
        <div className="row">{DateComponent()}</div>
        <br />

        <button type="submit" className="btn btn-primary">
          Create
        </button>
      </form>
    </div>
  );
}

export default Create;
