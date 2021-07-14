import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

import configureStore from "./store";
import { restoreCSRF, csrfFetch } from "./store/csrf";
import * as sessionActions from "./store/session";

const store = configureStore();

if (process.env.NODE_ENV !== "production") {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
}

function Root() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);




/*


I think the colours look fine - the nav bar up top is a little tight though - I personally find it disconcerting
to see a tiny sliver of colour like we do with the background (but the yellow border is okay. it could be 1 px
wider but it's more about the bit of background seen)

The GIF of how to use it is a bit large and shouldn't play automatically. Break it up into manageable chunks
(it looks like it's three or four discrete sections - perhaps a tutorial page with sections for each part)

also, the differing backgrounds on the tutorial sometimes clash with the landing page background. it might be
worth having a relatively "noiseless" tutorial page.

the how to play nav takes us to a pdf file directly - slightly disconcerting. I would recommend redirecting to
an internal page that acknowledges the official rule pdf (with a link to it) and summaries them to the best of
your ability (if you're within your legal rights to). if not, I would recommend the "how to play" becoming a CTA
button (call to action) to download the pdf or something, rather than redirecting to it.

on the map editor I can't click and drag to place hexagons which is counter-intuitive. I find it funny that I can
click, drag around, return to the clicked square, and release and it'll place one. same with remove squares.


*/
