import * as React from 'react';
import { Text, View,TouchableOpacity } from 'react-native';
import {globalStyles} from '../globals/styles';
import { Appbar } from 'react-native-paper';

function Header(props){

    return(
        <View>
        <Appbar.Header style = {globalStyles.appBar}>
        <Appbar.Content title={props.title} />
        <Appbar.Action icon="magnify" onPress={() => {}} />
        </Appbar.Header>
        </View>
    );
}
export default Header;