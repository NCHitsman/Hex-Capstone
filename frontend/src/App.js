import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupForm from "./components/LogInSignUpFormPage/SignupForm";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Home from './components/Home'
import SystemPage from "./components/SystemPage";
import CreateMap from "./components/CreateMap";
import MapPage from "./components/MapPage";

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
      {isLoaded && (
        <div className='PageContent'>
          <Switch>
            <Route exact path="/signup">
              <SignupForm />
            </Route>
            {user &&
              <>
                <Route exact path='/system/:systemId'>
                  <SystemPage user={user} />
                </Route>
                <Route exact path='/system/:systemId/map/:mapId'>
                  <MapPage />
                </Route>
                <Route exact path='/createMap'>
                  <CreateMap />
                </Route>
                <Route exact path='/'>
                  <Home user={user} />
                </Route>
              </>}
          </Switch>
        </div>
      )}
    </>
  );
}

export default App;
