import React from 'react'
import {
    View,
    StyleSheet,
} from 'react-native';
import Text from 'components/Text';

type CategoryItemProps = {
    category: Category
}

const CategoryItem = ({ category }: CategoryItemProps) => (
    <View style={styles.categoryItem}>
        <View style={styles.categoryItemImage} />
        <View style={{ width: 4.5 }} />
        <Text style={styles.categoryItemTitle}>{category.title}</Text>
        <View style={{ width: 5 }} />
    </View >
)

export default CategoryItem;


const styles = StyleSheet.create({
    categoryItem: {
        flexDirection: 'row',
        height: 36,
        backgroundColor: '#fff',
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 3,
        paddingVertical: 3,
        borderColor: '#e9ebeb',
        borderStyle: 'solid',
        borderWidth: 1
    },
    categoryItemImage: {
        aspectRatio: 1,
        height: '100%',
        backgroundColor: 'gray',
        borderRadius: 6,
        // marginRight: 4.5
    },
    categoryItemTitle: {
        color: '#939eaf',
        fontSize: 14
    }
});

