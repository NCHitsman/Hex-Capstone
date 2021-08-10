import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Home from './components/Home'
import SystemPage from "./components/SystemPage";
import CreateMap from "./components/CreateMap";
import MapPage from "./components/MapPage";
import LogInSignUpFormPage from "./components/LogInSignUpFormPage";
import Splashpage from './components/Splashpage'
import About from "./components/About";
import UnderConstruction from "./components/UnderConstruction";
import { GreaterStencilFunc } from "three";

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
        <>
          <div className='PageContent'>
            <Switch>
              <Route exact path='/signup'>
                <LogInSignUpFormPage page={'signup'} />
              </Route>
              <Route exact path='/login'>
                <LogInSignUpFormPage page={'login'} />
              </Route>
              <Route exact path='/features'>
                <UnderConstruction />
              </Route>
              <Route exact path='/mapGallery'>
                <UnderConstruction />
              </Route>
              <Route exact path='/about'>
                <About />
              </Route>
              <Route exact path='/faq'>
                <UnderConstruction />
              </Route>
              {user && <Route exact path='/system/:systemId'>
                <SystemPage user={user} />
              </Route>}
              {user && <Route exact path='/system/:systemId/map/:mapId'>
                <MapPage />
              </Route>}
              {user && <Route exact path='/system/:systemId/createMap'>
                <CreateMap />
              </Route>}
              {user && <Route exact path='/'>
                <Home user={user} />
              </Route>}
              <Route exact path='/'>
                <Splashpage />
              </Route>
              <Route>
                <Redirect to='/' />
              </Route>
            </Switch>
          </div>
        </>
      )}
    </>
  );
}

export default App;
