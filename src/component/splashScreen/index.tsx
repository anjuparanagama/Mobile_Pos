import React, { useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Animated,
  Dimensions,
  Image,
} from 'react-native';

import LottieView from 'lottie-react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const { width, height } = Dimensions.get('window');

const PRIMARY = '#7B468C';
const GOLD = '#F0C967';
const WHITE = '#FFFFFF';

const SplashScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),

      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        tension: 50,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 4000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        {/* Center Lottie Loading */}
        <LottieView
          source={require('../../assets/loading/cart.json')}
          autoPlay
          loop
          style={styles.lottie}
        />

        {/* Bottom Brand + Icons */}
        <View style={styles.bottomContent}>
          <Text style={styles.subtitle}>
            Manage Your Day to Day Sales Details
          </Text>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },

  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  lottie: {
    width: width * 0.65,
    height: height * 0.28,
  },

  title: {
    fontSize: 38,
    fontWeight: '900',
    color: WHITE,
    marginTop: -10,
    letterSpacing: 1,
    fontFamily: 'un-derana',
  },

  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },

  subtitle: {
    fontSize: 13,
    color: '#7B468C',
    marginTop: -25,
    marginBottom: 6,
    fontWeight: '500',
  },

  bottomContent: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 30,
    alignItems: 'center',
  },

  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
  },

  iconBox: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.12)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    marginHorizontal: 7,
  },

  iconBorder: {
    borderRightColor: 'rgba(255,255,255,0.08)',
    borderRightWidth: 1,
    paddingHorizontal: 10,
  },
});

export default SplashScreen;
