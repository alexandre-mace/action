import React from 'react';
import Layout from "../components/Layout";
import {Create} from "../components/event";
import AccountLink from "../components/AccountLink";

const CreateEventPage = props => {
  return (
    <Layout {...props}>
      <Create/>
    </Layout>
    )
};

export default CreateEventPage
