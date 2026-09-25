import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';

import Svg, {
  Path,
  Circle,
  Defs,
  LinearGradient,
  Stop,
} from 'react-native-svg';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const PRIMARY = '#7B468C';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const HEADER_HEIGHT = SCREEN_HEIGHT * 0.38;

const LoginScreen = ({ navigation }: any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const isEmailValid = username.includes('@') && username.includes('.');

  const handleLogin = () => {
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* HEADER */}

          <View style={styles.header}>
            <Svg
              width={SCREEN_WIDTH}
              height={HEADER_HEIGHT}
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              style={StyleSheet.absoluteFill}
            >
              <Defs>
                <LinearGradient
                  id="headerGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <Stop offset="0%" stopColor="#7B468C" />

                  <Stop offset="50%" stopColor="#9B5BB5" />

                  <Stop offset="100%" stopColor="#D18BE8" />
                </LinearGradient>
              </Defs>

              <Path
                d="
                M0,0 
                L100,0 
                L100,68 
                C80,80 65,55 45,68 
                C28,79 15,60 0,72 
                Z
                "
                fill="url(#headerGradient)"
              />
            </Svg>

            {/* Decorative circles */}

            <Svg
              width={SCREEN_WIDTH}
              height={HEADER_HEIGHT}
              style={StyleSheet.absoluteFill}
            >
              <Circle
                cx={SCREEN_WIDTH * 0.85}
                cy={HEADER_HEIGHT * 0.3}
                r={55}
                fill="#FFFFFF"
                opacity={0.08}
              />

              <Circle
                cx={SCREEN_WIDTH * 0.7}
                cy={HEADER_HEIGHT * 0.62}
                r={26}
                fill="#FFFFFF"
                opacity={0.1}
              />

              <Circle
                cx={SCREEN_WIDTH * 0.5}
                cy={HEADER_HEIGHT * 0.78}
                r={14}
                fill="#FFFFFF"
                opacity={0.12}
              />

              <Circle
                cx={SCREEN_WIDTH * 0.15}
                cy={HEADER_HEIGHT * 0.7}
                r={20}
                fill="#FFFFFF"
                opacity={0.1}
              />
            </Svg>

            <View style={styles.welcomeBox}>
              <Text style={styles.welcomeTitle}>Hello, Have a Nice Day .</Text>
            </View>
          </View>

          {/* FORM */}

          <View style={styles.card}>
            {/* Email */}

            <View style={styles.inputBox}>
              <Icon name="email-outline" size={20} color="#AAA" />

              <TextInput
                placeholder="email@gmail.com"
                placeholderTextColor="#999"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                keyboardType="email-address"
                style={styles.input}
              />

              {isEmailValid && <Icon name="check" size={20} color="#4CAF50" />}
            </View>

            {/* Password */}

            <View style={styles.inputBox}>
              <Icon name="lock-outline" size={20} color="#AAA" />

              <TextInput
                placeholder="Password"
                placeholderTextColor="#999"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
                style={styles.input}
              />

              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Icon
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color="#999"
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.forgot}>
              <Text style={styles.forgotText}>Forgot password?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginText}>Log in</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F8',
  },

  scrollContainer: {
    flexGrow: 1,
  },

  header: {
    height: HEADER_HEIGHT,
    paddingTop: 25,
    paddingHorizontal: 20,
    overflow: 'hidden',
  },

  welcomeBox: {
    flex: 1,
    justifyContent: 'center', // vertical center
    paddingHorizontal: 5,
    marginBottom: 30,
  },

  welcomeTitle: {
    fontSize: 30,
    fontWeight: '800',
    color: '#FFFFFF',
    lineHeight: 36,
    paddingTop: 10,
  },

  card: {
    paddingHorizontal: 28,
    paddingTop: 35,
    paddingBottom: 25,
  },

  inputBox: {
    height: 50,
    borderBottomWidth: 1,
    borderColor: '#E4E4E4',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },

  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 15,
    color: '#333',
  },

  forgot: {
    alignItems: 'flex-end',
    marginBottom: 25,
  },

  forgotText: {
    color: PRIMARY,
    fontSize: 13,
    fontWeight: '600',
  },

  loginButton: {
    height: 55,
    backgroundColor: PRIMARY,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loginText: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: '700',
  },
});

export default LoginScreen;
