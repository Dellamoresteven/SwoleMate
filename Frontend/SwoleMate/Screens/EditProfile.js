import React from 'react';
import styles from "./Styles/LoginScreenStyles";

import { Text, View, TextInput, TouchableOpacity, Picker, Modal, TouchableHighlight, Slider, Switch, ScrollView } from 'react-native';
import SelectMultiple from 'react-native-select-multiple';

import Loader from './Components/Loader';

import Connector from '../Utils/Connector';

//testing 123

export default class EditProfile extends React.Component {
    interests = ['Biking', 'Running', 'Swimming'];

    constructor(props) {
        super(props);

        this.state = {
            modalVisible: false,
            user: null,
            selectedInterests: [],
            cameraRollVisible: false,
            searchDistance: 1,
            isHidden: false,
        };

        Connector.get('/user', {email: props.navigation.dangerouslyGetParent().getParam('email')}, (res) => {
            this.setState({user: res});
            console.log(res);
        });

        this.save = this.save.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    //This sets the title on the top header
    static navigationOptions = {
        title: 'Edit Your Profile',
    };

    getSelectedImages(image){

    }

    onSelectionsChange = (selectedInterests) => {
        let newUser = this.state.user;
        let interests = [];

        for (let i = 0; i < selectedInterests.length; i++) {
            interests.push(selectedInterests[i].value);
        }

        newUser.interests = interests;

        this.setState({
            user: newUser,
            selectedInterests: selectedInterests
        });
        console.log(newUser.interests);
    };

    setCameraRollVisibility(visible){
        this.setState({cameraRollVisible: visible});
    }

    setModalVisibility(visible) {
        this.setState({modalVisible: visible});
    }

    save () {
        const user = this.state.user;

        Connector.post('/user/update', user, {email: user.email}, () => {
            this.props.navigation.pop();
        });
    }

    cancel () {
        this.props.navigation.pop();
    }

    render() {

        if (this.state.user == null)
            return <Loader/>;

        return (
          <ScrollView>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <TextInput
                    value={this.state.user.name}
                    placeholder='Name'
                    style={styles.textbox}
                    onChangeText={(name) => this.setState({user: {...this.state.user, name: name}})}
                    autoCapitalize='none'
                    autoCorrect={false}
                />

                <TextInput
                    value={this.state.user.email}
                    placeholder='Email'
                    style={styles.textbox}
                    onChangeText={(email) => this.setState({user: {...this.state.user, email: email}})}
                    autoCapitalize='none'
                    autoCorrect={false}
                />

                <TextInput
                    value={this.state.user.birthday}
                    placeholder='Birthday (mm/dd/yyyy)'
                    style={styles.textbox}
                    onChangeText={(birthday) => this.setState({user: {...this.state.user, birthday}})}
                    keyboardType='decimal-pad'
                    maxLength={10}
                />

                <TextInput
                    value={this.state.user.phone}
                    placeholder='Phone Number'
                    style={styles.textbox}
                    onChangeText={(phone) => this.setState({user: {...this.state.user, phone}})}
                    keyboardType='phone-pad'
                />

                <Picker
                    selectedValue={this.state.user.sex}
                    style={{height: 50, width: 150}}
                    onValueChange={(itemValue, itemIndex) => this.setState({user: {...this.state.user, sex: itemValue}})}>
                    <Picker.Item label="Male" value="male"/>
                    <Picker.Item label="Female" value="female"/>
                    <Picker.Item label="Prefer not to specify" value="not_specified"/>
                </Picker>

                <TextInput
                    value={this.state.user.bio}
                    placeholder='Describe what you are looking for'
                    onChangeText={ (bio) => this.setState({user: {...this.state.user, bio}})}
                    style={{height: 200, width: 200, borderColor: 'black', borderWidth: 1}}
                    multiline={true}
                />

                <Modal
                    transparent={false}
                    visible={this.state.modalVisible}>
                    <View style={{marginTop: 22}}>
                        <SelectMultiple
                            items={this.interests}
                            selectedItems={this.state.selectedInterests}
                            onSelectionsChange={this.onSelectionsChange}
                        />
                        <TouchableHighlight
                            onPress={() => {
                                this.setModalVisibility(!this.state.modalVisible);
                            }}>
                            <Text>Hide Interests</Text>
                        </TouchableHighlight>
                    </View>
                </Modal>

                <TouchableHighlight
                    onPress={() => {
                        this.setModalVisibility(true);
                    }}>
                    <Text>Show Interests</Text>
                </TouchableHighlight>

                <TouchableOpacity style={styles.button} onPress={()=> { this.props.navigation.navigate('PickPhoto',{email: this.props.navigation.getParam('email')})}}>
                    <Text>
                        Add Profile Picture
                    </Text>
                </TouchableOpacity>

                <Text>
                  Set search distance
                </Text>

                <View style={styles.container}>
                  <Text>{this.state.user.searchDistance}</Text>
                  <Slider
                    value={this.state.user.searchDistance}
                    style={{ width: 300 }}
                    minimumValue={1}
                    maximumValue={100}
                    step={1}
                    onValueChange={(val) => this.setState({user: {...this.state.user, searchDistance: val}})}
                  />
                </View>

                <View style={styles.container}>
                  <Text>
                    Go ghost
                  </Text>
                  <Switch
                    value={this.state.user.isHidden}
                    onValueChange={(switchState) => this.setState({user: {...this.state.user, isHidden: switchState}})}
                  />
                </View>

                <TouchableOpacity style={styles.button} onPress={this.save}>
                    <Text>
                        Save
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={this.cancel}>
                    <Text>
                        Cancel
                    </Text>
                </TouchableOpacity>
            </View>
          </ScrollView>
        );
    }
}
