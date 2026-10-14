import {PRODUCTS, ProductDetail} from "../../src/site";
import PageHead from "../../src/page-head";

export default function ProductPage({id}) {
  const product=PRODUCTS.find(item=>item.id===Number(id));
  return <>
    <PageHead title={product?.name||"Product Details"} description={product?.description||"Product specifications and export inquiry information from Sun Rich Paradise."}/>
    <ProductDetail id={id}/>
  </>;
}

export function getStaticPaths() {
  return {
    paths: PRODUCTS.map(product=>({params:{id:String(product.id)}})),
    fallback: "blocking",
  };
}

export function getStaticProps({params}) {
  if(!PRODUCTS.some(product=>product.id===Number(params.id)))return {notFound:true};
  return {props: {id: params.id}};
}
