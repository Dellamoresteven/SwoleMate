import React from 'react';
import {createStackNavigator, createDrawerNavigator} from 'react-navigation';

import LoginScreen from './Screens/LoginScreen';
import HomeScreen from './Screens/HomeScreen';
import RegisterScreen from './Screens/RegisterScreen';
import ProfileScreen from './Screens/ProfileScreen';
import EditProfile from './Screens/EditProfile';
import Matches from './Screens/Matches';
import Messages from './Screens/Messsages';
import PickPhoto from './Screens/PickPhoto';
import FAQ from './Screens/FAQ';
import OtherProfileScreen from "./Screens/OtherProfileScreen";
import Reset from './Screens/ResetScreen';
import ResetConfirm from './Screens/resetConfirmation';
import TutorialScreen from "./Screens/TutorialScreen";
import CalendarScreen from "./Screens/CalendarScreen";
import LocationPicker from "./Screens/LocationPicker";
import SharedProfile from "./Screens/SharedProfile";

/*This is the first class that gets loaded, it basically takes the intial
page and places it on the stack to be displayed*/
export default class App extends React.Component {
    render() {
        return <DrawerNavigator />;
    }
}

const startStack = createStackNavigator(
    {
        Login: {
            screen: LoginScreen
        },
        Register: {
            screen: RegisterScreen
        },
        Reset: {
            screen: Reset
        },
        ResetConfirm: {
            screen: ResetConfirm
        }
    }, {
        initialRouteName: 'Login'
    }
);

const ProfileStack = createStackNavigator(
    {
        ProfileScreen: {
            screen: ProfileScreen
        },
        EditProfile: {
            screen: EditProfile
        },
        PickPhoto: {
            screen: PickPhoto
        },
        LocationPicker: {
            screen: LocationPicker
        }
    }, {
        initialRouteName: 'ProfileScreen'
    }
);

const homeStack = createStackNavigator(
    {
        Home: {
            screen: HomeScreen
        },
        ExpandedProfile: {
            screen: OtherProfileScreen
        }
    }, {
        initialRouteName: 'Home'
    }
);

const matchesStack = createStackNavigator(
    {
        Matches: {
            screen: Matches
        },
        Messages: {
            screen: Messages,
        },
        SharedProfile: {
            screen: SharedProfile,
        }
    }
);

const tutorialStack = createStackNavigator(
    {
        Tutorial: {
            screen: TutorialScreen
        }
    }
);

const FAQStack = createStackNavigator(
    {
        FAQ: {
            screen: FAQ
        }
    }
);

const calendarStack = createStackNavigator(
    {
        calendar: {
            screen: CalendarScreen
        }
    }
);

//creates navigation stack (push when new page, pop when previous page requested)
const DrawerNavigator = createDrawerNavigator(
    {
        Home: {
            screen: homeStack
        },
        Profile: {
            screen: ProfileStack
        },
        Matches: {
            screen: matchesStack
        },
        Tutorial: {
            screen: tutorialStack
        },
        FAQ: {
            screen: FAQStack
        },
        Calendar: {
            screen: calendarStack
        },
        Logout: {
            screen: startStack,
            navigationOptions: {
                drawerLockMode: 'locked-closed'
            }
        }
    },
    {//options go here
        initialRouteName: 'Logout'
    }
);
