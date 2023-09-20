import React from 'react'
import {
    View,
    StyleSheet,
    Image,
} from 'react-native';
import Text from 'components/Text';
import { useSelector } from 'react-redux';
import { getMediaUploadPercentage } from 'store/selectors/media.selector';

type UploadItemProps = {
    item: IAsset
    index: number
}

const UploadItem = ({ item, index }: UploadItemProps) => {
    const uploadData = useSelector(getMediaUploadPercentage)
    const getUploadPercentage = (assetId: string) => uploadData?.[assetId]?.percentage

    return <View style={{ width: 200, padding: 20 }} key={index} >
        <View style={styles.imagePreviewContainer}>
            <Image source={{ uri: item.uri }} style={styles.imagePreview} />
        </View>
        <Text style={styles.uploadPercentageText}>
            {getUploadPercentage(item.assetId) === 100 ? 'Uploaded' : `${getUploadPercentage(item.assetId) || 0}%`}
        </Text>
        <View style={styles.uploadBar}>
            {/* @ts-ignore */}
            <View style={[styles.uploadBarProgress, { left: `-${100 - (getUploadPercentage(item.assetId) || 0)}%` }]}>
            </View>
        </View>
    </View>
}
export default UploadItem;


const styles = StyleSheet.create({
    uploadBar: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 10,
        overflow: 'hidden',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#d5d5d5'
    },
    uploadBarProgress: {
        backgroundColor: '#56aaff',
        height: '100%',
        width: '100%',
        position: 'absolute',
        top: 0,
    },
    uploadPercentageText: {
        color: 'gray',
        fontSize: 12,
        marginTop: 20
    },
    imagePreviewContainer: {
        width: '100%',
        height: 90
    },
    imagePreview: {
        height: '100%',
        objectFit: 'scale-down'
    },
});

