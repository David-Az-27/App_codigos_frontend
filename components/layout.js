import Head from 'next/head';

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Gana como Loco</title>
        <meta name="description" content="Promoción Gana como Loco" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>{children}</main>
    </>
  );
}