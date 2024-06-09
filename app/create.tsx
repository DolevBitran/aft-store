import * as React from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ProductForm } from 'components/Forms';

const Create = () => {
    // const onFocusBottomSheet = (e: NativeSyntheticEvent<TextInputFocusEventData>) => { e.preventDefault() }

    return <KeyboardAwareScrollView style={styles.container}>
        <View style={{ marginVertical: 20, marginHorizontal: 30 }}>
            <ProductForm />
        </View>
    </KeyboardAwareScrollView >
};

export default Create;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2'
    }
});