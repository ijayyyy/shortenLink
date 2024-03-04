import React from "react";

import Header from "../Header";
import Main from "../Main";
import About from "../About";
import Prices from "../Prices";
import DummyDash from "../DummyDash";
import Faqs from "../Faqs";
import Footer from "../Footer";

function Home() {
  return (
    <section>
      <Header />
      <Main id="Main" />
      <About id="About" />
      <Prices id="Prices" />
      <DummyDash />
      <Faqs id="Faqs" />
      <Footer />
    </section>
  );
}

export default Home;
