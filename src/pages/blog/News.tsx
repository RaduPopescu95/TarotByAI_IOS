import React, { useCallback, useEffect, useState } from "react";
import {
  Text,
  useColorScheme,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import styles from "./styles";
import { RefreshControl } from "react-native";
import { NewsCategory } from "../../utils/constant";
import { NewsTags } from "../../components/NewsTags/NewsTags";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../../utils/colors";
import { Platform } from "react-native";
import { StatusBar } from "react-native";
import { SearchInput } from "../../components/SearchInput/SearchInput";
import { NewsCard } from "../../components/NewsCard/NewsCard";
import { NewsDetailsModal } from "../../components/NewsDetailsModal/NewsDetailsModal";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  handleGetFirestore,
  handleQueryFirestoreGeneral,
} from "../../utils/firestoreUtils";
import { handleSearch } from "../../utils/searchUtils";
import { useLanguage } from "../../context/LanguageContext";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { filterArticlesBeforeCurrentTime } from "../../utils/commonUtils";
import { InterstitialAd, AdEventType, TestIds } from 'react-native-google-mobile-ads';
import { MainContainer } from "../../components/commonViews";

// Înlocuiți cu ID-ul real al unității de anunțuri pentru producție
const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-9577714849380446/7080054250';
const interstitialAd = InterstitialAd.createForAdRequest(adUnitId);



const News: React.FC = () => {
  const [newsFeed, setNewsFeed] = useState({});
  const [searchResults, SetSearchResults] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const { language, changeLanguage } = useLanguage();
  const navigation = useNavigation();
  const [interstitialLoaded, setInterstitialLoaded] = useState(false);
  
  const openModalWithArticle = async (article) => {
    await interstitialAd.show();
    setTimeout(() => {
      setSelectedArticle(article);
      setModalVisible(true);
    }, 500); // Ajustează întârzierea după necesități
  };
  
  
  const handleCloseModal = () => {
    setModalVisible(!modalVisible);
  };
  const saveArticle = async (article) => {
    try {
      // Obține lista curentă de articole salvate
      const savedArticlesJSON = await AsyncStorage.getItem("savedArticles");
      let savedArticles = savedArticlesJSON
        ? JSON.parse(savedArticlesJSON)
        : [];

      // Verifică dacă articolul există deja în listă
      const existingIndex = savedArticles.findIndex(
        (a) => a.documentId === article.documentId
      );

      if (existingIndex !== -1) {
        // Dacă articolul există deja, îl ștergem
        savedArticles.splice(existingIndex, 1);
        console.log("Article removed successfully");
      } else {
        // Dacă articolul nu există, îl adăugăm
        savedArticles.push(article);
        console.log("Article added successfully");
      }

      // Salvează lista actualizată înapoi în AsyncStorage
      await AsyncStorage.setItem(
        "savedArticles",
        JSON.stringify(savedArticles)
      );
    } catch (error) {
      console.error("Failed to save or remove the article", error);
    }
  };

  const handleGetData = async () => {
    // Obținerea datelor articolelor din Firestore

    const dataArt = await handleGetFirestore("BlogArticole");
    console.log("Articole...aici..unu.", dataArt)
    let articlesData  = filterArticlesBeforeCurrentTime(dataArt)
    console.log("Articole...aici...", articlesData)
    console.log("articles data...", articlesData);
    let articles = {};
    if (articlesData.length > 0) {
      // Sortarea articolelor după data și ora lor
      const sortedArticles = articlesData.sort((a, b) => {
        // Combină data și ora într-un singur string și convertește-le în obiecte de tip Date

        const dateTimeA = new Date(`${a.firstUploadDate} ${a.firstUploadtime}`);
        const dateTimeB = new Date(`${b.firstUploadDate} ${b.firstUploadtime}`);

        // Compară obiectele de tip Date
        return dateTimeB - dateTimeA;
      });

      // Selectarea celor mai noi două articole
      const latestArticles = sortedArticles.slice(0, 2);

      // Selectarea celor mai noi cinci articole
      const latestFiveArticles = sortedArticles.slice(0, 5);

      // Selectarea celui mai nou articol
      const lastArticle = sortedArticles[0]; // Primul articol din lista sortată este cel mai recent

      // Returnarea datelor către componenta Next.js
      articles = {
        articlesData,
        latestArticles,
        lastArticle,
        latestFiveArticles,
      };
    } else {
      articles = {
        articlesData: [],
        latestArticles: [],
        lastArticle: [],
        latestFiveArticles: [],
      };
    }
    setNewsFeed(articles);
  };

  const handleQueryData = async () => {
    let dataArt = await handleQueryFirestoreGeneral(
      "BlogArticole",
      "categorie",
      selectedCategory
    );
    console.log("articles data...query...", dataArt);


    let articlesData  = filterArticlesBeforeCurrentTime(dataArt)
    console.log("Articole...aici...", articlesData)


    let articles = {};
    if (articlesData.length > 0) {
      // Sortarea articolelor după data și ora lor
      const sortedArticles = articlesData.sort((a, b) => {
        // Combină data și ora într-un singur string și convertește-le în obiecte de tip Date
        const dateTimeA = new Date(`${a.firstUploadDate} ${a.firstUploadtime}`);
        const dateTimeB = new Date(`${b.firstUploadDate} ${b.firstUploadtime}`);

        // Compară obiectele de tip Date
        return dateTimeB - dateTimeA;
      });

      // Selectarea celor mai noi două articole
      const latestArticles = sortedArticles.slice(0, 2);

      // Selectarea celor mai noi cinci articole
      const latestFiveArticles = sortedArticles.slice(0, 5);

      // Selectarea celui mai nou articol
      const lastArticle = sortedArticles[0]; // Primul articol din lista sortată este cel mai recent

      // Returnarea datelor către componenta Next.js
      articles = {
        articlesData,
        latestArticles,
        lastArticle,
        latestFiveArticles,
      };
    } else {
      articles = {
        articlesData: [],
        latestArticles: [],
        lastArticle: [],
        latestFiveArticles: [],
      };
    }
    setNewsFeed(articles);
  };

  useEffect(() => {
    // function to query firestore by category
    console.log("filter by category", selectedCategory);
    if (selectedCategory === "All") {
      handleGetData();
    } else {
      handleQueryData();
    }
  }, [selectedCategory]);

  useEffect(() => {
    handleGetData();
  }, []);

  const handleRefresh = useCallback(() => {
    setSelectedCategory("All");
    handleGetData();
  }, []); //add a dependecy

  const backgroundColor = useColorScheme() === "dark" ? "#000" : "#fff";

  const handleSearchData = (text) => {
    console.log("Start......");
    const newData = handleSearch(newsFeed?.articlesData, language, text);
    // console.log("new data...", newData);
    SetSearchResults(newData);
    // console.log("Search reasults...length...", searchResults.length);
  };

  useEffect(() => {
    // Ascultător pentru evenimentul de încărcare a interstitialului
    const loadListener = interstitialAd.addAdEventListener(AdEventType.LOADED, () => {
      setInterstitialLoaded(true);
    });

    // Ascultător pentru evenimentul de închidere a interstitialului
    const closeListener = interstitialAd.addAdEventListener(AdEventType.CLOSED, () => {
      // Navigația se face după închiderea interstitialului
      // if (isFuture) {
      //   navigation.navigate(screenName.FutureReading, {
      //     item,
      //   });
      // }
      // Reîncărcați interstitialul pentru utilizări ulterioare
      setInterstitialLoaded(false);
      interstitialAd.load();
    });

    const errorListener = interstitialAd.addAdEventListener(
      AdEventType.ERROR,
      (error) => {
        console.error(error);
      }
    );




    // Încărcați interstitialul
    interstitialAd.load();

    return () => {
      // Curățare la demontare
      loadListener();
      closeListener();
      errorListener();
    };
  }, []);


  return (
    <MainContainer>
      <LinearGradient
        colors={[
          colors.gradientLogin1,
          colors.gradientLogin2,
          colors.gradientLogin2,
        ]} // Înlocuiește cu culorile gradientului tău
        style={{
          flex: 1,
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 10,
          }}
        >
          <View style={{ width: "90%" }}>
            <SearchInput
              searchText={searchText}
              setSearchText={setSearchText}
              setIsLoading={setIsLoading}
              handleSearchData={handleSearchData}
            />
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("SavedNews")}
            style={{ width: "10%", alignItems: "flex-start" }}
          >
            <FontAwesome name="heart" size={24} color={colors.gradientLogin3} />
          </TouchableOpacity>
        </View>
        {!searchText?.trim() && (
          <NewsTags
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          )}
        
          {newsFeed?.articlesData?.length === 0 &&
        <Text style={{color:"white", padding:5}}>
        We're brewing some fresh content! Check back soon to read our latest articles. In the meantime, explore our existing resources.
        </Text>
        }
        <FlatList
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          data={searchText.length > 0 ? searchResults : newsFeed.articlesData}
          renderItem={({ item }) => (
            <NewsCard post={item} onPress={openModalWithArticle} />
          )}
          contentContainerStyle={{
            paddingBottom: "25%",
          }} // Asigură-te că există spațiu la marginea inferioară
          style={styles.list}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />
          }
        />
      
        <NewsDetailsModal
          visible={modalVisible}
          article={selectedArticle}
          articleIndex={0} // Ajustează în funcție de cazul de utilizare
          onClose={handleCloseModal}
          saveArticle={saveArticle}
        />
      </LinearGradient>
    </MainContainer>
  );
};

export default News;
