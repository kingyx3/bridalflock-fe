import PopularServices from "../components/Landing/PopularServices";
import Services from "../components/Landing/Services";
import React from "react";
import Head from "next/head";
import { envVars } from "../utils/envConfig";

function Index() {
  return (
    <>
      <Head>
        <title>{envVars.REACT_APP_NAME} | Wedding Services Marketplace</title>
        <meta name="description" content={`Find the perfect wedding services on ${envVars.REACT_APP_NAME} - your trusted wedding marketplace`} />
        <link rel="icon" href="/favicon.ico" />
        {/* Consider adding Open Graph tags for social sharing too */}
      </Head>

      <main className="bg-neutral-light dark:bg-neutral-dark">
        <PopularServices />
        <div className="border-t border-neutral-medium/30 dark:border-neutral-medium mx-auto max-w-7xl" />
        <Services />
      </main>
    </>
  );
}

export default React.memo(Index);