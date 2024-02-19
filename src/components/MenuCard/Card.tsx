import React, { useEffect, useRef, useState } from "react";
import {
  TouchableWithoutFeedback,
  ImageBackground,
  Text,
  StyleSheet,
  View,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../utils/colors";
import { useNavigationState } from "../../context/NavigationContext";
import { H7fontBoldPrimary, H8fontBoldPrimary } from "../commonText";
import {
  InterstitialAd,
  TestIds,
  AdEventType,
} from "react-native-google-mobile-ads";

// Adaugă 'text', 'screen', și 'image' ca props-uri ale componentei Card
const Card = ({ text, screen, image, interstitialAdLoaded, interstitial }) => {
  const navigation = useNavigation();
  const shouldNavigateRef = useRef(false);
  const { setCurrentScreen } = useNavigationState();

  useEffect(() => {
    const closeListener = () => {
      if (shouldNavigateRef.current) {
        navigation.navigate(screen);
        shouldNavigateRef.current = false;
      }
    };

    interstitial.addAdEventListener(AdEventType.CLOSED, closeListener);
  }, [interstitial, screen, navigation]);

  const onCardPress = async () => {
    shouldNavigateRef.current = true;
    if (interstitialAdLoaded) {
      try {
        console.log("show...");
        await interstitial.show();
        setCurrentScreen(screen);
      } catch (error) {
        console.error("InterstitialAd.show() error:", error);
        shouldNavigateRef.current = false;
        setCurrentScreen(screen);
      }
    } else {
      navigation.navigate(screen);
      setCurrentScreen(screen);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={onCardPress}>
      <View style={styles.container}>
        <View style={styles.flipCard}>
          <ImageBackground
            source={image} // Utilizează prop-ul 'image' pentru a seta sursa
            style={styles.buttonStyle}
          >
            <H8fontBoldPrimary style={styles.textStyle}>
              {text}
            </H8fontBoldPrimary>
          </ImageBackground>
        </View>
        {/* Se poate adăuga conținutul pentru partea din spate a cardului aici, dacă este necesar */}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("window").width / 3,
    width: Dimensions.get("window").width / 2.5,
    // borderRadius: 5,
    overflow: "hidden",
    // borderColor: colors.primary2,
    // borderWidth: 3,
    elevation: 4,
    margin: 13,
  },
  buttonStyle: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    position: "absolute",
  },
  flipCard: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    // Se poate seta backfaceVisibility la "hidden" dacă este necesar
  },
  flipCardBack: {
    // Stiluri pentru partea din spate a cardului, dacă este utilizată
  },
  textStyle: {
    textAlign: "center",
    flexShrink: 0, // Previne strângerea textului
    width: "70%", // Ajustează lățimea după necesități
    paddingHorizontal: 5,
    color: colors.gradientLogin2,
  },
  // Alte stiluri necesare
});

export default Card;
