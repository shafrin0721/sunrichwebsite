import "../src/styles.css";
import "../src/interactions.css";
import "../src/reference-ui.css";
import {SiteShell} from "../src/site";

export default function App({Component, pageProps}) {
  return <SiteShell><Component {...pageProps}/></SiteShell>;
}
