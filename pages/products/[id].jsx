import {ProductDetail} from "../../src/site";
import PageHead from "../../src/page-head";

export default function ProductPage({id}) {
  return <>
    <PageHead title="Product Details" description="Product specifications and export inquiry information from Sun Rich Paradise."/>
    <ProductDetail id={id}/>
  </>;
}

export function getStaticPaths() {
  return {
    paths: Array.from({length: 16}, (_, index) => ({params: {id: String(index + 1)}})),
    fallback: "blocking",
  };
}

export function getStaticProps({params}) {
  return {props: {id: params.id}};
}
