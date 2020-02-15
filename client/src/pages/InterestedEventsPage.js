import React from 'react';
import InterestedEvents from "../components/event/InterestedEvents";
import Layout from "../components/Layout";
import AccountLink from "../components/AccountLink";

const InterestedEventsPage = (props) => (
  <Layout {...props}>
    <InterestedEvents {...props}/>
  </Layout>
);

export default InterestedEventsPage;
