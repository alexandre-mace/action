import React from 'react';
import { Route } from 'react-router-dom';
import { List, Create, Update, Show } from '../components/event/';
import CreateEventPage from "../pages/CreateEventPage";

export default [
  <Route path="/ajouter-un-evenement" component={CreateEventPage} exact key="initiate" />,
  <Route path="/events/create" component={Create} exact key="create" />,
  <Route path="/events/edit/:id" component={Update} exact key="update" />,
  <Route path="/events/show/:id" component={Show} exact key="show" />,
  <Route path="/events/" component={List} exact strict key="list" />,
  <Route path="/events/:page" component={List} exact strict key="page" />
];