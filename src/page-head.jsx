import Head from "next/head";

export default function PageHead({title, description}) {
  return (
    <Head>
      <title>{title} | Sun Rich Paradise</title>
      <meta name="description" content={description}/>
      <meta name="theme-color" content="#08783f"/>
    </Head>
  );
}
