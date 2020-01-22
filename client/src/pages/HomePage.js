import React from 'react';
import SearchEvent from "../components/event/SearchEvent";
import Layout from "../components/Layout";
import Map from "../components/event/LeafletMap";

const HomePage = () => (
  <Layout>
      <SearchEvent/>
      <div className={"container"}>
      </div>
  </Layout>
);
export default HomePage
