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
}

const ImagePickerComponent = ({ }: ImagePickerComponentProps) => {
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

            if (result.assets?.length) {
                const fileExtension = Platform.OS === 'web' ?
                    result.assets[0].uri.substring("data:image/".length, result.assets[0].uri.indexOf(";base64")) :
                    result.assets[0].uri.substring(result.assets[0].uri.lastIndexOf('.') + 1);

                const assetsArray: IAsset[] = result.assets.map(asset => ({ ...asset, fileExtension, assetId: uniqueSid() }))

                dispatch.media.appendAssets(assetsArray);
                const assets = await Promise.all(assetsArray.map(asset => uploadAsset(asset)))
                console.log(assets)
                if (!result.canceled) {
                }
            }
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

