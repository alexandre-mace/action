import React from 'react';
import Layout from "../components/Layout";
import {Create, Update} from "../components/event";

const UpdateEventPage = props => {
  return (
    <Layout {...props}>
      <Update {...props}/>
    </Layout>
  )
};

export default UpdateEventPage;
