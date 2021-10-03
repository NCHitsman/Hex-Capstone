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
import Features from "./components/Features";
import MapGallery from "./components/MapGallery";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  useEffect(() => {
    let i1 = new Image()
    i1.src = '../../images/overlook.jpg'
    let i2 = new Image()
    i2.src = '../../images/SpaceMarines.png'
    let i3 = new Image()
    i3.src = '../../images/headshot.jpg'
    let i4 = new Image()
    i4.src = '../../images/shipoutofwarpbackground.png'
    let i5 = new Image()
    i5.src = '../../images/eddy-gonzalez-davila-kasrkins.jpg'
    let i6 = new Image()
    i6.src = '../../images/orkattack.png'
    let i7 = new Image()
    i7.src = '../../images/shipwarp2background.png'
  }, [])

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
                <Features />
              </Route>
              <Route exact path='/mapGallery'>
                <MapGallery />
              </Route>
              <Route exact path='/about'>
                <About />
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
