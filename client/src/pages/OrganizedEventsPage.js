import React from 'react';
import Layout from "../components/Layout";
import OrganizedEvents from "../components/event/OrganizedEvents";

const OrganizedEventsPage = (props) => (
  <Layout {...props}>
    <OrganizedEvents {...props}/>
  </Layout>
);

export default OrganizedEventsPage;
