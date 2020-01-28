import React, {useState} from 'react';
import Layout from "../components/Layout";
import OnBoarding from "../components/OnBoarding";
import SwipeableViews from "react-swipeable-views";

const OnBoardingPage = props => {
  return (
    <Layout {...props}>
      <OnBoarding/>
      </Layout>
  )
};
export default OnBoardingPage;
