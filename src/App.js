import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./component/auth/Login";
import { useDispatch } from "react-redux";
import Register from "./component/auth/Register";

import Home from "./component/pages/Home/Home";
import User from "./component/pages/User/User";
import Job from "./component/pages/Job/Job";
import CreateJob from "./component/pages/Job/CreateJob";
import ViewJob from "./component/pages/Job/ViewJob";
import UpdateJob from "./component/pages/Job/UpdateJob";
import CreateUser from "./component/pages/User/CreateUser";
import { useSelector } from "react-redux";

import { userProfile } from "./actions/auth";
import Page404 from "./component/pageNotFound/page404";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userProfile());
  }, [dispatch]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Home />}></Route>
        <Route path="404" element={<Page404 />} />
        <Route path="*" element={<Page404 />} />
        <Route path="/dashboard/user" element={<User />}></Route>
        <Route path="/dashboard/job" element={<Job />}></Route>
        <Route path="/dashboard/job/createjob" element={<CreateJob />}></Route>
        <Route path="/dashboard/job/viewjob/:id" element={<ViewJob />}></Route>
        <Route
          path="/dashboard/job/updatejob/:id"
          element={<UpdateJob />}
        ></Route>
        <Route
          path="/dashboard/user/create-user"
          element={<CreateUser />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
