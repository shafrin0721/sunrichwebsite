import {Auth} from "../src/site";
import PageHead from "../src/page-head";

export default function LoginPage() {
  return <>
    <PageHead title="Sign In" description="Sign in to your Sun Rich Paradise account."/>
    <Auth/>
  </>;
}
