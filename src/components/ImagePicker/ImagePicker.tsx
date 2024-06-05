import React from 'react'
import {
    StyleSheet,
    Pressable,
    Platform,
} from 'react-native';
import Text from 'components/Text';

import * as ImagePicker from 'expo-image-picker';

import { useDispatch } from 'react-redux';
import { Dispatch } from 'store/index';
import { uploadAsset } from 'utils/upload';
import { uniqueSid } from 'utils';

type ImagePickerComponentProps = {
    onImagesSelected(result: ImagePicker.ImagePickerResult): void
}

const ImagePickerComponent = ({ onImagesSelected }: ImagePickerComponentProps) => {
    const dispatch = useDispatch<Dispatch>()

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 4],
                quality: 1,
                base64: true,
                allowsMultipleSelection: true
            });
            onImagesSelected(result)
        } catch (err) {
            console.error('fn: PickImage', err)
        }
    };

    return <>
        <Pressable onPress={pickImage} style={styles.imagePickerButton}>
            <Text style={{ fontSize: 14, color: "#574ba1" }}>Add product images</Text>
        </Pressable>
    </>
}

export default ImagePickerComponent;


const styles = StyleSheet.create({
    imagePickerButton: {
        backgroundColor: 'white',
        alignSelf: 'flex-start',
        borderRadius: 4,
        paddingVertical: 4,
        paddingHorizontal: 8,
        marginTop: 12,
        height: 160,
        width: 160,
        alignItems: 'center',
        justifyContent: 'center',
        borderStyle: 'dashed',
        borderColor: 'gray',
        borderWidth: 2
    }
});

