import "../src/styles.css";
import "../src/interactions.css";
import {SiteShell} from "../src/site";

export default function App({Component, pageProps}) {
  return <SiteShell><Component {...pageProps}/></SiteShell>;
}
