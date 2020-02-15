import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ListIcon from '@material-ui/icons/List';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AddIcon from '@material-ui/icons/Add';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {bottomNavigationLinks} from "../config/bottomNavigationLinks";
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import {authentication} from "../utils/authentication";
import Typography from "@material-ui/core/Typography";
import {Badge, FormControlLabel} from "@material-ui/core";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Checkbox from "@material-ui/core/Checkbox";
import BookmarksRoundedIcon from '@material-ui/icons/BookmarksRounded';
import FolderSharedRoundedIcon from '@material-ui/icons/FolderSharedRounded';
import EventRoundedIcon from '@material-ui/icons/EventRounded';

const useStyles = makeStyles({
    root: {
        position: 'fixed',
        bottom: '0',
        left: '0',
        width: '100vw',
        zIndex: '10000',
        height: '66px',
        borderTopLeftRadius: '25px',
        borderTopRightRadius: '25px',
        backgroundColor: "white",
    },
    bottomNavAction: {
        color: '#a3a3a3',
        fontWeight: 500,
        '& .Mui-selected, &.Mui-selected .MuiSvgIcon-root': {
            color: '#39374E',
        },
        padding: "3px 10px"
    }
});

// const renderBottomNavigationActionWithBadge = (props) => {
//     console.log(props)
//     return (
//         <Badge
//                color="primary"
//                badgeContent={"zer"}>
//         </Badge>
//     )
// };

const bottomNavigationIcons = {
    'list':  ListIcon,
    'related': BookmarksRoundedIcon,
    'add': AddIcon,
    'account': AccountCircleIcon,
    'folder' : FolderSharedRoundedIcon,
    'agenda' : EventRoundedIcon
};

const AppBottomNavigation = (props) => {
    const classes = useStyles();

    let defaultValue = 0;
    bottomNavigationLinks.forEach(bottomNavigationLink => {
        if (('/' + bottomNavigationLink.route === props.history.location.pathname) || ('/se-connecter' === props.history.location.pathname)) {
            defaultValue = props.history.location.pathname;
        }
    });
    const [value, setValue] = React.useState(defaultValue);


    return (
        <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
                props.history.push(newValue)
                setValue(newValue);
            }}
            showLabels
            className={classes.root}
        >
            {bottomNavigationLinks.map((bottomNavigationLink, index) => {
                const SpecificIcon = bottomNavigationIcons[bottomNavigationLink.icon]
                if (bottomNavigationLink.label === 'Mon compte' && !authentication.currentUserValue) {
                    return (
                        <BottomNavigationAction key={index} className={classes.bottomNavAction} value={'/se-connecter'} label={'Se connecter'}
                                                icon={<MeetingRoomIcon/>}/>
                    )
                }
                if (bottomNavigationLink.label === 'Mon compte' && authentication.currentUserValue && props.user) {
                    return (
                        <BottomNavigationAction
                            key={index}
                            className={classes.bottomNavAction}
                            value={'/' + bottomNavigationLink.route}
                            label={bottomNavigationLink.label}
                            icon={<Badge badgeContent={props.notifications} color={"primary"}><SpecificIcon /></Badge>}
                        />
                    )
                }

                return (<BottomNavigationAction key={index} className={classes.bottomNavAction} value={'/' + bottomNavigationLink.route} label={bottomNavigationLink.label}
                                        icon={<SpecificIcon/>}/>)
            })}
        </BottomNavigation>
    );
}
export default AppBottomNavigation;
