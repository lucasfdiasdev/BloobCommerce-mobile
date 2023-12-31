import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, FlatList, Image, StyleSheet, View } from 'react-native';
import ImgNot from '../assets/images/cat-notebook1.webp';

const Carousel = () => {
  const flatlistRef = useRef();

  // get dimensions
  const screenWidth = Dimensions.get('window').width;
  const [activeIndex, setActiveIndex] = useState(0);

  // auto scroll
  useEffect(() => {
    let interval = setInterval(() => {
      if (activeIndex === images.length - 1) {
        flatlistRef.current.scrollToIndex({
          index: 0,
          animated: true,
        });
      } else {
        flatlistRef.current.scrollToIndex({
          index: activeIndex + 1,
          animated: true,
        });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [activeIndex]);

  const getItemLayout = (_, index) => ({
    length: screenWidth,
    offset: screenWidth * index,
    index,
  });

  // data for carousel
  const images = [
    {
      id: '01',
      image: ImgNot,
    },
    {
      id: '02',
      image: ImgNot,
    },
    {
      id: '03',
      image: ImgNot,
    },
    {
      id: '04',
      image: ImgNot,
    },
  ];

  const renderItem = ({ item }) => {
    return (
      <View>
        <Image
          source={item.image}
          style={{
            height: 200,
            width: screenWidth,
            position: 'relative',
          }}
        />
      </View>
    );
  };

  // Handle Scroll
  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.floor(scrollPosition / screenWidth);

    setActiveIndex(index);
  };

  // render dot indicators
  const renderDotIndicators = () => {
    return images.map((dot, index) => {
      return (
        <View
          key={index}
          style={{
            backgroundColor: index === activeIndex ? 'green' : 'red',
            height: 10,
            width: 10,
            borderRadius: 5,
            margin: 5,
          }}
        ></View>
      );
    });
  };

  return (
    <View>
      <FlatList
        data={images}
        ref={flatlistRef}
        renderItem={renderItem}
        getItemLayout={getItemLayout}
        keyExtractor={(item) => item.id}
        horizontal={true}
        pagingEnabled={true}
        onScroll={handleScroll}
        showsHorizontalScrollIndicator={false}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          position: 'absolute',
          bottom: 10,
          left: 0,
          right: 0,
        }}
      >
        {renderDotIndicators()}
      </View>
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({});
