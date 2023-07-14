import ReactGA from "react-ga4";
import { G_TAG_ID } from "./constants";

export const initGA = () => {
  ReactGA.initialize(G_TAG_ID);
};

export const logPageView = (path, title) => {
  ReactGA.send({ hitType: "pageview", page: path, title });
};

export const logEvent = (event) => {
  ReactGA.event(event);
};
