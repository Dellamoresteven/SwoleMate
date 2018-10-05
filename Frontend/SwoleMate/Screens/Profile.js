import React from 'react';
import {TouchableOpacity, Text, View, Image} from 'react-native';
import styles from './Styles/LoginScreenStyles';
import Connector from "../Utils/Connector";

export default class Profile extends React.Component{
    
    constructor(props){
        super(props);
        const { navigation } = this.props;

        this.state = {
            user: null
        };

        Connector.get('/user', {email: props.navigation.getParam('email')}, (res) => {
            this.setState({user: res});

            this.renderImage={
                'Swimming': false,
                'Running': false,
                'Lifting': false,
                'Hiking': false,
            };

            const interests = res.interests;

            for(let i=0;i<interests.length;i++){
                if(interests[i] in this.renderImage){
                    this.renderImage[interests[i]]=true;
                }
            }
        });
    }

    //This sets the title on the top header
    static navigationOptions = {
        title: 'Profile',
    };

    renderImage = {};
    
    render(){
        const images = (
            <View>
            {this.renderImage['Swimming'] && <Image  source={require('./images/Swimming.png')}
            />}
            {this.renderImage['Running'] &&<Image  source={require('./images/Running.png')}
            />}
            {this.renderImage['Lifting'] && <Image  source={require('./images/Lifting.png')}
            />}
            {this.renderImage['Hiking'] &&<Image  source={require('./images/Hiking.png')}
            />}
            </View>
        );

        if (this.state.user == null)
            return null;

        return(
            <View>
                {images}
                <TouchableOpacity style={styles.clearButton} onPress={this.editProfile}>
                    <Text>
                        Edit
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.clearButton} onPress={this.testName}>
                    <Text>
                        Test
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    editProfile = () => {
        const { navigation } = this.props;
        var userinfo={
            email: navigation.getParam('email')
        };
        this.props.navigation.navigate('EditProfile', userinfo);
    };

    testName = () => {
        //this alert tests that username was successfully recieved from previous page
        alert('Interests1: ' + interests[0] + "\nInterests2: " + interests[1]);
        //this.props.navigation.navigate('Profile');
    }
}