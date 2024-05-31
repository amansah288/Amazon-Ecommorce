import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";

const Carousel = () => {
  const flatlistRef = useRef();

  const [activeIndex, setActiveIndex] = useState(0);

  const Screnwidth = Dimensions.get("window").width;

  // Auto Scroll

  useEffect(() => {
    // if activeIndex === last index --> jump back to the first index
    // else activeIndex +1

    let interavl = setInterval(() => {
      if (activeIndex === carouselData.length - 1) {
        flatlistRef.current.scrollToIndex({
          index: 0,
          animation: true,
        });
      } else {
        flatlistRef.current.scrollToIndex({
          index: activeIndex + 1,
          animation: true,
        });
      }
    }, 2000);

    return () => clearInterval(interavl);
  });

  const getItemLayout = (data, index) => ({
    length: Screnwidth,
    offset: Screnwidth * index,
    index: index,
  });

  const carouselData = [
    {
      id: "01",
      image:
        "https://img.etimg.com/thumb/msid-93051525,width-1070,height-580,imgsize-2243475,overlay-economictimes/photo.jpg",
    },
    {
      id: "02",
      image:
        "https://images-eu.ssl-images-amazon.com/images/G/31/img22/Wireless/devjyoti/PD23/Launches/Updated_ingress1242x550_3.gif",
    },
    {
      id: "03",
      image:
        "https://images-eu.ssl-images-amazon.com/images/G/31/img23/Books/BB/JULY/1242x550_Header-BB-Jul23.jpg",
    },
  ];

  // Display images

  const renderItem = ({ item, index }) => {
    return (
      <View>
        <Image
          src={item.image}
          style={{ height: 200, width: Screnwidth, borderRadius: 40 }}
        />
      </View>
    );
  };

  // Handle Scroll
  const handleScroll = (event) => {
    // Get the Scroll position
    const scrollPosition = event.nativeEvent.contentOffset.x;
    //console.log({ scrollPosition });

    // Get the index of currentactive item

    const index = scrollPosition / Screnwidth;

    // screenwidth = 393
    // screenposition = 393

    // index = 1
    //console.log({ index });

    // update the index

    setActiveIndex(index);
  };

  // Render Dot Indicator
  const renderDotIndicators = () => {
    return carouselData.map((dot, index) => {
      // if the active index === index

      if (activeIndex === index) {
        return <View key={index} style={styles.renderDotViewGreen}></View>;
      } else {
        return <View key={index} style={styles.renderDotView}></View>;
      }
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={carouselData}
        ref={flatlistRef}
        getItemLayout={getItemLayout}
        renderItem={renderItem}
        horizontal={true}
        pagingEnabled={true}
        onScroll={handleScroll}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.DotDisplay}>{renderDotIndicators()}</View>
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
  },
  renderDotView: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: "#90A4AE",
    marginHorizontal: 6,
  },
  DotDisplay: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  renderDotViewGreen: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: "#13274F",
    marginHorizontal: 6,
  },
});
