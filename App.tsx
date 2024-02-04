import React, { useEffect, useRef, useState } from "react";
import RootNavigation from "./navigations";

import { MenuProvider } from "react-native-popup-menu";
import { Provider } from "react-redux";
import { View } from "react-native";
import {
  ActivityIndicator,
  Button,
  Card,
  Paragraph,
  Text,
} from "react-native-paper";

import * as Notifications from "expo-notifications";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";

import Bugsnag from "@bugsnag/expo";

import i18n from "./i18n";
import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AuthProvider, useAuth } from "./src/context/AuthContext";
import { NavBarVisibilityProvider } from "./src/context/NavbarVisibilityContext";
import { NavigationProvider } from "./src/context/NavigationContext";
import { LanguageProvider } from "./src/context/LanguageContext";
import { ApiDataProvider } from "./src/context/ApiContext";
import store from "./Store";
import * as Font from "expo-font";
import { NumberProvider } from "./src/context/NumberContext";
import { requestTrackingPermissionsAsync } from "expo-tracking-transparency";

import mobileAds from "react-native-google-mobile-ads";
import {
  AppOpenAd,
  InterstitialAd,
  RewardedAd,
  BannerAd,
  TestIds,
} from "react-native-google-mobile-ads";
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions";

mobileAds()
  .initialize()
  .then((adapterStatuses) => {
    console.log("Initialization of adds complete!");
    // Initialization complete!
  });

// AppOpenAd.createForAdRequest(TestIds.APP_OPEN);

// InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL);

// RewardedAd.createForAdRequest(TestIds.REWARDED);

// Start BugSnag first...
// Bugsnag.start();

// -----------------------NOTIFICATION START-------------------------

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const App = () => {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const [languageLoaded, setLanguageLoaded] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const notificationListener = useRef();
  const responseListener = useRef();

  async function loadFonts() {
    await Font.loadAsync({
      Entypo: require("./assets/fonts/Entypo.ttf"),
      Lora: require("./assets/fonts/Lora/Lora-SemiBold.ttf"), // Asigură-te că calea este corectă
      LoraBold: require("./assets/fonts/Lora/Lora-Bold.ttf"), // Asigură-te că calea este corectă
      // adaugă aici alte fonturi după necesitate
    });
    setFontsLoaded(true); // Actualizează starea după încărcarea fonturilor
  }

  const checkTransparencyPermission = async () => {
    try {
      const { status } = await requestTrackingPermissionsAsync();
      if (status === "granted") {
        console.log("Yay! I have user permission to track data");
      } else {
        console.log("asdas");
      }
    } catch (err) {
      console.log("error at checkTransparencyPermission", err);
    }
  };

  useEffect(() => {
    checkTransparencyPermission();
    loadFonts();

    const loadLanguage = async () => {
      try {
        const savedLanguage = await AsyncStorage.getItem("@userLanguage");
        if (savedLanguage !== null) {
          i18n.locale = savedLanguage;
        }
      } catch (e) {
        console.error("Failed to load the language from storage");
      }
      setLanguageLoaded(true);
    };

    loadLanguage();
  }, []);

  const Stack = createNativeStackNavigator();

  if (!languageLoaded || !fontsLoaded) {
    return (
      // Render a loading screen or spinner
      <ActivityIndicator />
    );
  }
  return (
    <>
      <NumberProvider>
        <ApiDataProvider>
          <LanguageProvider>
            <NavigationProvider>
              <NavBarVisibilityProvider>
                <AuthProvider>
                  <NavigationContainer>
                    <StatusBar style="light" />
                    <Provider store={store}>
                      <MenuProvider>
                        <RootNavigation />
                      </MenuProvider>
                    </Provider>
                  </NavigationContainer>
                </AuthProvider>
              </NavBarVisibilityProvider>
            </NavigationProvider>
          </LanguageProvider>
        </ApiDataProvider>
      </NumberProvider>
    </>
  );
};
export default App;
