import "./App.scss";
import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import PutLogin from "./loginPage/putlogin";
import Header from "./Header/header";
import Categories from "./Categories/categories";
import { AuthProvider } from "./auth";
import Dashboard from "./Dashboard/dashboard";

import BetEntry from "./Betbuilder/bet";
import BuilderList from "./Betbuilder/builderList";
import CreateBet from "./Betbuilder/createBet";
import Betoptions from "./Betbuilder/betoptions";
import UpdateAddContion from "./Betbuilder/updateAddContion";

import Configaration from "./Configu/confi";
import Notification from "./Configu/notification";
import StoriesList from "./Configu/storiesList";
import AddStory from "./Configu/addStory";
import Headline from "./Configu/headline";
import Profile from "./Configu/profile";
import PunterLogs from "./Configu/punterLogs";
import ParaEntry from "./Parlays/parla";
import Parlays from "./Parlays/parlays";
import CreateParlay from "./Parlays/createParlay";
import UpdateAddParlayCondi from "./Parlays/addUpdateParCondi";
import Predicitions from "./Predicitions/predici";
import AddPre from "./Predicitions/addPre";
import PredeList from "./Predicitions/predeList";
import Orders from "./Orders/order";
import Updatepre from "./Predicitions/updatepre";
// import Transactions from "./Orders/transactions";
// import Gateway from "./Orders/gateway";
import Leagues from "./Leagues/leagues";
import Teams from "./Teams/teams";
import Users from "./Users/users";
import { BrowserRouter, Router, Routes, Route } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/admin/login" />;
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          <Routes>
            <Route
              path="/admin/login"
              element={<PutLogin setIsLoggedIn={setIsLoggedIn} />}
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            ></Route>

            <Route path="/configaration" element={<Configaration />}>
              <Route path="notification" element={<Notification />}></Route>
              <Route path="storieslist" element={<StoriesList />}></Route>
              <Route path="addstory" element={<AddStory />}></Route>
              <Route path="headline" element={<Headline />}></Route>
              <Route path="profile" element={<Profile />}></Route>
              <Route path="punterlogs" element={<PunterLogs />}></Route>
            </Route>

            <Route path="/multi" element={<ParaEntry />}>
              <Route path="multilist" element={<Parlays />}></Route>
              <Route path="createmulti" element={<CreateParlay />}></Route>
              <Route
                path="addupdatecondition/:id"
                element={<UpdateAddParlayCondi />}
              ></Route>
            </Route>

            <Route path="/sgm" element={<BetEntry />}>
              <Route path="sgmlist" element={<BuilderList />}></Route>
              <Route path="createsgm" element={<CreateBet />}></Route>
              <Route path="sgmoptions" element={<Betoptions />}></Route>
              <Route
                path="addcondition/:id"
                element={<UpdateAddContion />}
              ></Route>
            </Route>

            <Route path="/predections" element={<Predicitions />}>
              <Route path="predectionslist" element={<PredeList />}></Route>
              <Route path="addpredictions" element={<AddPre />}></Route>
              <Route path="updateprediction" element={<Updatepre />}></Route>
            </Route>

            <Route path="/teams" element={<Teams />}></Route>
            <Route path="/leagues" element={<Leagues />}></Route>
            <Route path="/users" element={<Users />}></Route>
            <Route path="/categories" element={<Categories />}></Route>

            <Route path="/orders" element={<Orders />}>
              {/* <Route path="transactions" element={<Transactions />}></Route>
            <Route path="gateway" element={<Gateway />}></Route> */}
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
};

export default App;

// class="text-decoration-line-through"
