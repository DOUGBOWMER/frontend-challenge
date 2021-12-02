import Head from "next/head";
import Slider from "../components/Slider";

export default function Home() {
  return (
    <div className="flex-col h-screen justify-items-center">
      <Head>
        <meta name="description" content="Take Home Challenges" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Responsive - Slider</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Slider />
    </div>
  );
}
