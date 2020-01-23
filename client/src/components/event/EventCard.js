import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import Link from "react-router-dom/es/Link";
import {Badge} from "@material-ui/core";
import Chip from '@material-ui/core/Chip';
import {connect} from "react-redux";
import {Typography} from "@material-ui/core";
import Button from '@material-ui/core/Button';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import BookmarkIcon from '@material-ui/icons/Bookmark';

const useStyles = makeStyles(theme => ({
  card: {
    display: 'flex',
    minHeight: "270px",
    height: '100%',
    flexDirection: 'column',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  title: {
    fontSize: '1.2rem',
    fontWeight: '600'
  },
  root: {
    paddingTop: '0'
  }
}));

function EventCard(props) {
  const classes = useStyles();

  const user = props.authenticated ? (props.updated ? props.updated : props.retrieved) : false;

  let totalMessages = 0;
  if (props.event.forum) {
    totalMessages = props.event.forum.messages.length
  }
  return (
    <Card key={props.event['@id']} className={classes.card}>
      <Link to={`les-projets/${encodeURIComponent(props.event['@id'])}`}>
        <CardHeader
          classes={{title: classes.title}}
          title={`${props.event.name.substring(0, 60)} ${props.event.name.length > 58 ? '...' : ''}`}
          subheader={''}
        />
        <CardContent classes={{root: classes.root}} className={"pb-1 pb-md-3"}>
          <div className="d-flex flex-column w-100">
            <div className={"d-none d-md-flex"}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At ducimus, eaque fuga illum iste iure libero magnam magni nulla numquam officiis, perspiciatis placeat quas quisquam rem sed sequi, voluptatem voluptatum!
            </div>
            <div className={"d-flex justify-content-between w-100"}>
                <div></div>
            </div>
          </div>
        </CardContent>
      </Link>

      <CardActions className={'mt-auto d-flex justify-content-between'} disableSpacing>
        {/*<Button color="secondary" onClick={() => props.handleEventSelected(props.event)}>*/}
        {/*  MAP*/}
        {/*</Button>*/}
        <div className="d-flex justify-content-between w-100 p-1">
          <div className="d-flex flex-column">
            <div className="font-weight-bold">16/02</div>
            <div  className="font-weight-light">19h</div>
          </div>
          <div>
            {props.distance ? props.distance : ''}
          </div>
        </div>
        <div className="d-flex">
          <IconButton color="secondary" size="medium">
            <BookmarkIcon fontSize="large"/>
          </IconButton>
            <IconButton color="primary">
            <EventAvailableIcon fontSize="large"/>
            </IconButton>
        </div>
      </CardActions>
    </Card>
  );
}

const mapStateToProps = state => ({
  updated: state.user.update.updated,
  retrieved: state.user.show.retrieved
});

const mapDispatchToProps = dispatch => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventCard);
