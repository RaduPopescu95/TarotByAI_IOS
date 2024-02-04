import React, { Fragment, useEffect, useState } from "react";
import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Button, SocialMediaLogin } from "../components/commonButton";
import { GeneralProps } from "../interfaces/generalProps";
import { Route, useRoute } from "@react-navigation/native";
import { labels } from "../utils/labels";
import { screenName } from "../utils/screenName";
import {
  FormErrorMessage,
  H10fontRegularWhite,
  H6fontBoldPrimary,
  H6fontBoldWhite,
  H6fontRegularBlack,
  H7fontMediumPrimary,
  H7fontMediumWhite,
  H8fontMediumPrimary,
  H8fontMediumWhite,
  H9fontRegularBlack,
  H9fontRegularGray,
} from "../components/commonText";
import {
  CommonLineView,
  MainContainer,
  RowView,
  SubContainer,
} from "../components/commonViews";
import { colors } from "../utils/colors";
import {
  alignItemsCenter,
  flex1,
  ml10,
  mt10,
  mt20,
  pb10,
  ph15,
} from "../common/commonStyles";
import { StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import {
  emailValidation,
  minLengthValidation,
  numberValidation,
  requiredValidation,
  validationSchema,
} from "../utils/validationConfig";
import { InputFields } from "../components/commonInputFields";

import { authentication, db, storage } from "../../firebase";
import { ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
import { setDoc, doc } from "firebase/firestore";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { handleSignOut } from "../utils/handleSignOut";
import i18n, { languageCode } from "../../i18n";
import {
  ICountry,
  PhoneInput,
  getCountryByCca2,
} from "react-native-international-phone-number";
import CustomLoader from "../components/customLoader";
import { TouchableWithoutFeedback } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import { Snackbar } from "react-native-paper";
import SnackBar from "../components/SnackBar";
import { handleFirebaseAuthError } from "../utils/authUtils";
import { useAuth } from "../context/AuthContext";

interface Props extends GeneralProps {
  route: Route<string, object | undefined>;
}

const SignUpScreenClinic: React.FC<Props> = ({ navigation }): JSX.Element => {
  const formKeys = {
    email: "email",
    mobileNo: "mobileNo",
    firstName: "firstName",
    lastName: "lastName",
    password: "password",
    confirmPassword: "confirmPassword",
  };

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    watch,
  } = useForm();

  const route = useRoute();

  // const [registerType, setRegisterType] = useState(route.params.item)
  const [registerType, setRegisterType] = useState("email");
  const [message, setMessage] = useState("email");
  const [isLoading, setIsLoading] = useState(false);
  const [showSnackback, setShowSnackback] = useState(false);
  const { setUserData } = useAuth();

  let pwd = watch("password");
  const auth = authentication;

  const onSubmit = (detaila) => {
    setIsLoading(true);
    console.log(detaila);

    createUserWithEmailAndPassword(auth, detaila.email, detaila.password)
      .then((userCredentials) => {
        setTimeout(async () => {
          const user = userCredentials.user;

          const collectionId = "Users";
          const documentId = user.uid;
          const value = {
            owner_uid: user.uid,
            first_name: detaila.firstName,
            last_name: detaila.lastName,
            email: detaila.email,
            // Adaugă orice alte câmpuri necesare
          };
          setUserData({ ...value });
          setDoc(doc(db, collectionId, documentId), value);
          console.log("success PASS");
        }, 1500);
      })
      .then(() => {
        // storeData('Clinic');
      })
      .then(() => {
        // navigation.navigate(screenName.SignInScreenClinic);
      })
      .catch((error) => {
        const errorMessage = handleFirebaseAuthError(error);
        // Aici puteți folosi errorMessage pentru a afișa un snackbar sau un alert
        setShowSnackback(true);
        setMessage(errorMessage);
      });

    setIsLoading(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <Fragment>
        <MainContainer>
          <CustomLoader isLoading={isLoading} />
          <LinearGradient
            colors={[
              colors.gradientLogin1,
              colors.gradientLogin2,
              colors.gradientLogin3,
            ]} // Înlocuiește cu culorile gradientului tău
            style={styles.gradient}
          >
            <KeyboardAvoidingView
              style={{ flex: 1, paddingBottom: "0%" }}
              keyboardVerticalOffset={65}
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                <View style={styles.subContainer}>
                  <View
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      paddingTop: "15%",
                    }}
                  >
                    <H6fontBoldWhite>
                      {i18n.translate("signUp")}
                    </H6fontBoldWhite>

                    <Image
                      source={require("../../assets/headerIcon.png")}
                      style={{ width: 300, height: 100 }}
                      resizeMode="contain" // Aceasta va asigura că întreaga imagine se va încadra în spațiul disponibil, păstrând proporțiile.
                    />
                  </View>

                  <View>
                    {registerType === "email" && (
                      <Controller
                        name={formKeys.firstName}
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <InputFields
                            errorMessage={errors[
                              formKeys.firstName
                            ]?.message.toString()}
                            value={value}
                            onChangeText={onChange}
                            placeholder={i18n.translate("firstName")}
                            image={"person"}
                          />
                        )}
                        rules={{
                          required: requiredValidation(
                            i18n.translate("firstName")
                          ),
                        }}
                      />
                    )}
                    {registerType === "email" && (
                      <Controller
                        name={formKeys.lastName}
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <InputFields
                            errorMessage={errors[
                              formKeys.lastName
                            ]?.message.toString()}
                            value={value}
                            onChangeText={onChange}
                            placeholder={i18n.translate("lastName")}
                            image={"person"}
                          />
                        )}
                        rules={{
                          required: requiredValidation(
                            i18n.translate("lastName")
                          ),
                        }}
                      />
                    )}
                    {registerType === "email" && (
                      <Controller
                        name={formKeys.email}
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <InputFields
                            errorMessage={errors[
                              formKeys.email
                            ]?.message.toString()}
                            value={value}
                            onChangeText={onChange}
                            placeholder={i18n.translate("email")}
                            image={"email"}
                          />
                        )}
                        rules={{
                          required: requiredValidation(i18n.translate("email")),
                          validate: emailValidation,
                        }}
                      />
                    )}

                    {registerType === "email" && (
                      <Controller
                        name={formKeys.password}
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <InputFields
                            isPassword={true}
                            value={value}
                            isSecure={true}
                            onChangeText={onChange}
                            placeholder={i18n.translate("createPassword")}
                            errorMessage={errors[
                              formKeys.password
                            ]?.message.toString()}
                            image={"lock-outline"}
                          />
                        )}
                        rules={{
                          required: requiredValidation(
                            i18n.translate("createPassword")
                          ),
                          minLength: minLengthValidation(
                            validationSchema.password.minLength
                          ),
                        }}
                      />
                    )}

                    {registerType === "email" && (
                      <Controller
                        name={formKeys.confirmPassword}
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <InputFields
                            isPassword={true}
                            value={value}
                            isSecure={true}
                            onChangeText={onChange}
                            placeholder={i18n.translate("confirmPassword")}
                            errorMessage={errors[
                              formKeys.confirmPassword
                            ]?.message.toString()}
                            image={"lock-outline"}
                          />
                        )}
                        rules={{
                          required: requiredValidation(
                            i18n.translate("confirmPassword")
                          ),
                          validate: (value) =>
                            value === pwd || i18n.translate("passDontMatch"),
                        }}
                      />
                    )}
                  </View>

                  <Button
                    disabled={false}
                    funCallback={handleSubmit(onSubmit)}
                    label={i18n.translate("register")}
                    success={true}
                    bgColor={colors.primary3}
                    borderColor={colors.white}
                    borderWidth={0.2}
                    txtColor={colors.white}
                    style={{ width: 300 }}
                  />

                  <View>
                    <View style={styles.infoTextViewStyle}>
                      <H7fontMediumPrimary>
                        {i18n.translate("alreadyAccount")}{" "}
                      </H7fontMediumPrimary>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate(
                            screenName.SignInScreenClinic as any
                          )
                        }
                      >
                        <H7fontMediumPrimary
                          style={{ textDecorationLine: "underline" }}
                        >
                          {i18n.translate("registerLogin")}
                        </H7fontMediumPrimary>
                      </TouchableOpacity>
                    </View>
                    {/* <View style={styles.borderLineStyle}>
                  <CommonLineView />
                </View> */}
                  </View>
                </View>
              </ScrollView>
            </KeyboardAvoidingView>
            {showSnackback && (
              <SnackBar
                showSnackBar={showSnackback}
                setShowSnackback={setShowSnackback}
                message={message}
                bottom={2}
                screen={screenName.SignInScreenClinic}
              />
            )}
          </LinearGradient>
        </MainContainer>
      </Fragment>
    </View>
  );
};
export default SignUpScreenClinic;

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    // paddingTop: "5%",
    paddingBottom: "5%",
  },
  gradient: {
    flex: 1,
    width: "100%",
    height: "100%",

    // Alte stiluri necesare pentru a pozitiona gradientul după cum este necesar
  },
  subContainer: {
    paddingHorizontal: 20,
    paddingBottom: "10%",
  },
  infoTextViewStyle: {
    paddingTop: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },

  socialMediaIconStyle: { height: 15, width: 22, alignSelf: "center" },

  socialMediaFBIconStyle: { alignItems: "center", justifyContent: "center" },
  borderLineStyle: { paddingTop: 10 },
  footerComponentView: { paddingTop: 30 },
  passwordIconStyle: { justifyContent: "center", alignItems: "center" },
  userIconsStyle: {
    height: 20,
    width: 20,
    alignSelf: "center",
    justifyContent: "center",
  },
});
