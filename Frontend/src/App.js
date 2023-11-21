import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./components/home/Home";
import Event from "./components/event/Event";
import StudyGroup from "./components/studyGroup/StudyGroup";
import Create from "./components/create/Create";
import MeetUp from "./components/meetup/MeetUp";
import User from "./components/user/User";
import Specific from "./components/specific/Specific";
import Login from "./components/authentication/Login";
import Signup from "./components/authentication/Signup";
import Navbar from "./components/navbar/Navbar";
import Logout from "./components/authentication/Logout";

const URL = "https://n8rffxphe1.execute-api.us-east-1.amazonaws.com/dev";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home url={URL} />,
  },
  {
    path: "/event",
    element: <Event url={URL} />,
  },
  {
    path: "/studygroup",
    element: <StudyGroup url={URL} />,
  },
  {
    path: "/create",
    element: <Create url={URL}/>,
  },
  {
    path: "/meetup",
    element: <MeetUp url={URL} />,
  },
  {
    path: "/user",
    element: <User url={URL} />,
  },
  {
    path: "/specific",
    element: <Specific url={URL} />,
  },
  {
    path: "/logout",
    element: <Logout url={URL} />,
  },
]);

const authenticationRoutes = createBrowserRouter([
  {
    path: "/",
    element: <Login url={URL} />,
  },
  {
    path: "/login",
    element: <Login url={URL} />,
  },
  {
    path: "/signup",
    element: <Signup url={URL} />,
  },
  {
    path: "*",
    element: <Login url={URL} />,
  },
]);

function App() {
  var authenticated = localStorage.getItem("isAuthenticated");
  var name = localStorage.getItem("name");
  if (authenticated) {
    return (
      <div className="App">
        <Navbar userName={name} />
        <div className="container">
          <RouterProvider router={router} />
        </div>
      </div>
    );
  } else {
    return (
      <div className="App">
        <RouterProvider router={authenticationRoutes} />
      </div>
    );
  }
}

export default App;
