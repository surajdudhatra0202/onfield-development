import React from 'react';
import { FlatList, Image, TouchableOpacity, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ImageOrVideo } from 'react-native-image-crop-picker';
import { Colors } from '@/constants';
import { styles } from './styles';

interface ImageGridProps {
  images: ImageOrVideo[];
  onRemove?: (index: number) => void;
  numColumns?: number;
  baseUrl?: string
}

const ImageGrid = ({ images, onRemove, numColumns = 3, baseUrl }: ImageGridProps) => {
  console.log(baseUrl,images);
  
  return (
    <FlatList
      data={images}
      keyExtractor={(_, index) => index.toString()}
      numColumns={numColumns}
      contentContainerStyle={styles.container}
      renderItem={({ item, index }) => (
        <View style={styles.imageWrapper}>
          <Image source={{ uri: (baseUrl || '') + (item?.path ?? item) }} style={styles.imageGredStyle} />
          {onRemove && (
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => onRemove(index)}>
              <MaterialIcons name="close" size={18} color={Colors.white} />
            </TouchableOpacity>
          )}
        </View>
      )}
    />
  );
};


export default ImageGrid;
