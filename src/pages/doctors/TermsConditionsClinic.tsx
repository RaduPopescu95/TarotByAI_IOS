import React, {Fragment, useEffect, useState, Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {MainContainer} from '../../components/commonViews';
import {NavBar} from '../../common/commonComponents';
import {termAndConditionTextClinic} from '../../utils/constant';
import {uploadTermsConditionsClinicPatient} from '../../utils/UploadFirebaseData';
import {useSelector} from 'react-redux';
import {Feather} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import {screenName} from '../../utils/screenName';
import i18n from '../../../i18n';

const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
  const paddingToBottom = 20;
  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  );
};

interface Props extends GeneralProps {
  route: Route<string, object | undefined>;
}

const TermsConditionsClinic: React.FC<Props> = ({}): JSX.Element => {
  const [accepted, setAccepted] = useState(false);
  const navigation = useNavigation();

  const clinicInfoDB = useSelector(state => state.clinicInfoData);
  const {clinicInformation, loading} = clinicInfoDB;
  const handleAccept = () => {
    uploadTermsConditionsClinicPatient(termAndConditionTextClinic, true);
    navigation.navigate(screenName.ClinicProfileSettings);
  };
  
  return (
    <Fragment>
      <MainContainer>
        <NavBar
          title={i18n.translate("tcMessage")}
          isGoBack={true}
          navHeight={80}
          isTermsAccepted={
            clinicInformation &&
            clinicInformation.termsConditions &&
            clinicInformation.termsConditions.isAccepted
              ? true
              : false
          }
        />
        <View style={styles.container}>
          <Text style={styles.title}>{i18n.translate("tcMessage")}</Text>
          <ScrollView
            style={styles.tcContainer}
            onScroll={({nativeEvent}) => {
              if (isCloseToBottom(nativeEvent)) {
                setAccepted(true);
              }
            }}>
              <Text style={styles.tcP}>{termAndConditionTextClinic[0].text}</Text>
              <TouchableOpacity onPress={() => Linking.openURL('https://policies.google.com/terms')}>
                  <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>
                    Google Play Sercices
                  </Text>
            </TouchableOpacity>
              <TouchableOpacity onPress={() => Linking.openURL('https://firebase.google/terms/analytics')}>
                  <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>
                    Google Analytics for Firebase
                  </Text>
            </TouchableOpacity>
              <TouchableOpacity onPress={() => Linking.openURL('https://firebase.google.com/terms/crashlytics')}>
                  <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>
                    Firebase Crashlytics
                  </Text>
            </TouchableOpacity>
              <TouchableOpacity onPress={() => Linking.openURL('https://expo.io/terms')}>
                  <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>
                    Expo
                  </Text>
            </TouchableOpacity>
              <TouchableOpacity onPress={() => Linking.openURL('https://www.revenuecat.com/terms')}>
                  <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>
                    RevenueCat
                  </Text>
            </TouchableOpacity>
              <Text style={styles.tcP}>{termAndConditionTextClinic[1].text}</Text>
              <Text style={styles.tcP}>{termAndConditionTextClinic[2].text}</Text>
              <TouchableOpacity onPress={() => Linking.openURL('https://policies.google.com/terms')}>
                  <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>
                    Google Play Sercices
                  </Text>
            </TouchableOpacity>
              <TouchableOpacity onPress={() => Linking.openURL('https://firebase.google/terms/analytics')}>
                  <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>
                    Google Analytics for Firebase
                  </Text>
            </TouchableOpacity>
              <TouchableOpacity onPress={() => Linking.openURL('https://firebase.google.com/terms/crashlytics')}>
                  <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>
                    Firebase Crashlytics
                  </Text>
            </TouchableOpacity>
              <TouchableOpacity onPress={() => Linking.openURL('https://expo.io/terms')}>
                  <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>
                    Expo
                  </Text>
            </TouchableOpacity>
              <TouchableOpacity onPress={() => Linking.openURL('https://www.revenuecat.com/terms')}>
                  <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>
                    RevenueCat
                  </Text>
            </TouchableOpacity>
              <Text style={styles.tcP}>{termAndConditionTextClinic[3].text}</Text>
            {/* <Text style={styles.tcP}>
                The use of this website is subject to the following terms of use
              </Text> */}
          </ScrollView>
          {clinicInformation.termsConditions &&
          !clinicInformation.termsConditions.isAccepted ? (
            <TouchableOpacity
              disabled={!accepted}
              onPress={() => handleAccept()}
              style={
                accepted ? styles.button : [styles.buttonDisabled, {width: 200}]
              }>
              <Text style={styles.buttonLabel}>Accept</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.buttonDisabled}>
              <Feather name="check-circle" size={24} color="white" />
              <Text style={[styles.buttonLabel, {marginLeft: 10}]}>
                Terms Accepted
              </Text>
            </View>
          )}
        </View>
      </MainContainer>
    </Fragment>
  );
};

const {width, height} = Dimensions.get('window');

const styles = {
  container: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  title: {
    fontSize: 22,
    alignSelf: 'center',
  },
  tcP: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 12,
  },
  tcP: {
    marginTop: 10,
    fontSize: 12,
  },
  tcL: {
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 12,
  },
  tcContainer: {
    marginTop: 15,
    marginBottom: 15,
    height: height * 0.7,
  },

  button: {
    backgroundColor: '#136AC7',
    borderRadius: 5,
    padding: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    width: 200,
  },

  buttonDisabled: {
    backgroundColor: '#999',
    borderRadius: 5,
    padding: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
  },

  buttonLabel: {
    fontSize: 14,
    color: '#FFF',
  },
};

export default TermsConditionsClinic;
