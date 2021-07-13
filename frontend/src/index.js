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

The GIF of how to use it is a bit large and shouldn't play automatically. Break it up into manageable chunks
(it looks like it's three or four discrete sections - perhaps a tutorial page with sections for each part)

also, the differing backgrounds on the tutorial sometimes clash with the landing page background. it might be
worth having a relatively "noiseless" tutorial page.

I think the colours look fine - the nav bar up top is a little tight though - I personally find it disconcerting
to see a tiny sliver of colour like we do with the background (but the yellow border is okay. it could be 1 px
wider but it's more about the bit of background seen)

The core text on the left introing what the game is should be broken up slightly. It's hard to read a paragraph
of text like that imo, and it could use one or two break lines to introduce whitespace. your padding on the left
and right seems just perfect, but the padding on the bottom, between "A WARHAMMER 40K NARRATIVE COMPANION GAME"
and the top box, and between the boxes themselves doesn't match the left/right padding.

your features page is "under construction" so the link is a dead link and just shouldn't exist or should exist
but be clearly greyed out and unclickable (if the layout needs it to be there for whatever reason)

the how to play nav takes us to a pdf file directly - slightly disconcerting. I would recommend redirecting to
an internal page that acknowledges the official rule pdf (with a link to it) and summaries them to the best of
your ability (if you're within your legal rights to). if not, I would recommend the "how to play" becoming a CTA
button (call to action) to download the pdf or something, rather than redirecting to it.

same as #5 for map gallery and FAQ.

for your about me, the zoom in/out is interesting but there's also an arbitrary scrollbar (perhaps because I have
the console open?). it should be removed, as it detracts from the fun of the page. it would be neat if there was
some easter egg upon "zooming in all the way" (i.e., to where it slows down a tonne).

on the map editor I can't click and drag to place hexagons which is counter-intuitive. I find it funny that I can
click, drag around, return to the clicked square, and release and it'll place one. same with remove squares.

adding command bastions/power stations/etc. to hexagons - I should be able to overwrite a hex rather than clear
it (though I see value in clearing it being required so as to not accidentally make a mistake - but if you cannot
  drag and apply multiple at once it shouldn't be an issue).

*/
