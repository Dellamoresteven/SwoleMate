import React from 'react';

import Profile from './Components/Profile';

export default class OtherProfileScreen extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            email: props.navigation.getParam('email')
        };
    }

    render () {
        return(
            <Profile email={this.state.email} />
        );
    }
}
