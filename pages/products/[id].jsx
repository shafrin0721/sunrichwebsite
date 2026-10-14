import {PRODUCTS, ProductDetail, findProductBySlug, getProductSlug} from "../../src/site";
import PageHead from "../../src/page-head";

export default function ProductPage({slug}) {
  const product=findProductBySlug(slug);
  return <>
    <PageHead title={product?.name||"Product Details"} description={product?.description||"Product specifications and export inquiry information from Sun Rich Paradise."}/>
    <ProductDetail slug={slug}/>
  </>;
}

export function getStaticPaths() {
  return {
    paths: PRODUCTS.map(product=>({params:{id:getProductSlug(product)}})),
    fallback: "blocking",
  };
}

export function getStaticProps({params}) {
  const slug=params.id;
  const product=findProductBySlug(slug);
  if(!product)return {notFound:true};
  if(slug!==getProductSlug(product)){
    return {
      redirect: {
        destination:`/products/${getProductSlug(product)}`,
        permanent:true,
      },
    };
  }
  return {props: {slug}};
}
