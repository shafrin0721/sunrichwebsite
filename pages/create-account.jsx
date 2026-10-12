import {Auth} from "../src/site";
import PageHead from "../src/page-head";

export default function CreateAccountPage() {
  return <>
    <PageHead title="Create Account" description="Create an account with Sun Rich Paradise."/>
    <Auth register/>
  </>;
}
