import {NotFound} from "../src/site";
import PageHead from "../src/page-head";

export default function Custom404() {
  return <>
    <PageHead title="Page Not Found" description="The requested Sun Rich Paradise page could not be found."/>
    <NotFound/>
  </>;
}
