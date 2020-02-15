import React from 'react';
import Layout from "../components/Layout";
import MainEventSearch from "../components/MainEventSearch";

const HomePage = (props) => (
  <Layout {...props}>
    <MainEventSearch {...props}/>
  </Layout>
);

export default HomePage;
