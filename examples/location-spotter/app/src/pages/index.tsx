import type { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";
import useGeolocation from "react-hook-geolocation";


// import { trpc } from "../utils/trpc";

const Map = dynamic(() => import("../components/map"), { ssr: false });


const Home: NextPage = () => {
  // const hello = trpc.useQuery(["example.hello", { text: "from tRPC" }]);

  const geolocation = useGeolocation({
    enableHighAccuracy: true,
    maximumAge: 15000,
    timeout: 12000,
  });

  // if (geolocation.error) {
  // render some some instruction to allow access to geolocation
  // }

  return (
    <>
      <Head>
        <title>Location Spotter</title>
        <meta name="description" content="Commercial Location Spotter" />
        <link rel="icon" type="image/svg+xml" href="/assets/images/favicon.svg"/>
        <link rel="icon" type="image/png" href="/assets/images/favicon.png"/>
      </Head>

      <main className="h-screen w-screen">
        <Map geolocation={geolocation}/>

        {/* <div className="pt-6 text-2xl text-blue-500 flex justify-center items-center w-full">
          {hello.data ? <p>{hello.data.greeting}</p> : <p>Loading..</p>}
        </div> */}
      </main>
    </>
  );
};

export default Home;
