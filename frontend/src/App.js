import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Home from './components/Home'
import SystemPage from "./components/SystemPage";
import CreateMap from "./components/CreateMap";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const user = useSelector(state => state.session.user)

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && user && (
        <Switch>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path='/system/:systemId'>
            <SystemPage user={user} />
          </Route>
          <Route exact path='/createMap'>
            <CreateMap />
          </Route>
          <Route exact path='/'>
            <Home user={user} />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
