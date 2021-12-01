import { render } from "react-dom";
import { LiveblocksProvider, RoomProvider } from "@liveblocks/react";

import App from "./App";
import Three from "./Three";

import { createClient } from "@liveblocks/client";

const client = createClient({
  publicApiKey: "pk_live_wFCGkcqXzANe-yuJQvmhqQZd",
});

const rootElement = document.getElementById("root");
render(
  <LiveblocksProvider client={client}>
    <RoomProvider id="Monso">
      {
        true ?
        <App />
        :
        <Three />
      }
      
    </RoomProvider>
  </LiveblocksProvider>,
  rootElement
);
