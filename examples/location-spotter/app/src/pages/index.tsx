import type { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";
import RegisterLocation from "../components/register-location";

// import { trpc } from "../utils/trpc";

const Map = dynamic(() => import("../components/map"), { ssr: false });


const Home: NextPage = () => {
  // const hello = trpc.useQuery(["example.hello", { text: "from tRPC" }]);

  return (
    <>
      <Head>
        <title>Location Spotter</title>
        <meta name="description" content="Commercial Location Spotter" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg"/>
        <link rel="icon" type="image/png" href="/favicon.png"/>
      </Head>

      <main className="h-screen w-screen">
        <Map/>

        {/* <div className="pt-6 text-2xl text-blue-500 flex justify-center items-center w-full">
          {hello.data ? <p>{hello.data.greeting}</p> : <p>Loading..</p>}
        </div> */}

      </main>
      <RegisterLocation/>
    </>
  );
};

export default Home;
