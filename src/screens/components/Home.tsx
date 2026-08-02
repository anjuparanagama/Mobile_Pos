import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
  StatusBar,
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import type { SidemenuParams } from '../../interface/sidemenu';
import MobileBottomNavbar from '../../component/menuBar';

const { width } = Dimensions.get('window');

const PRIMARY = '#006D44';
const GOLD = '#F0C967';
const BG_LIGHT = '#F4F7F6';

const CATEGORIES = [
  { id: '1', title: 'කාර්', icon: '🚗' },
  { id: '2', title: 'වෑන්', icon: '🚐' },
  { id: '3', title: 'මෝටර් බයිසිකල්', icon: '🏍️' },
  { id: '4', title: 'බස්/ලොරි', icon: '🚚' },
  { id: '5', title: 'ත්‍රීවීල්', icon: '🛺' },
];

const RECENT_ADS = [
  {
    id: '1',
    title: 'Toyota Vitz 2018',
    price: 'Rs. 8,500,000',
    location: 'කොළඹ 07',
    time: 'පැය 2කට පෙර',
    image:
      'https://images.unsplash.com/photo-1590362891991-f776e747a588?q=80&w=500&auto=format&fit=crop',
  },
  {
    id: '2',
    title: 'Honda Vezel RS',
    price: 'Rs. 10,200,000',
    location: 'මහරගම',
    time: 'පැය 5කට පෙර',
    image:
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=500&auto=format&fit=crop',
  },
];

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<SidemenuParams>>();
  const [search, setSearch] = useState('');

  const renderCategory = ({ item }: any) => (
    <TouchableOpacity style={styles.catCard}>
      <Text style={styles.catIcon}>{item.icon}</Text>
      <Text style={styles.catTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={PRIMARY} />

      {/* HEADER SECTION */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.brandTitle}>
            රථගාය<Text style={{ color: GOLD }}>.lk</Text>
          </Text>
          <TouchableOpacity
            style={styles.profileBtn}
            onPress={() => navigation.navigate('Account')}
          >
            <Text style={styles.profileIcon}>👤</Text>
          </TouchableOpacity>
        </View>

        {/* SEARCH BAR */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="ඔබ සොයන වාහනය මෙහි සඳහන් කරන්න..."
            placeholderTextColor="#999"
            value={search}
            onChangeText={setSearch}
          />
          <TouchableOpacity style={styles.searchBtn}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>සොයන්න</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* CATEGORIES SECTION */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ප්‍රධාන කාණ්ඩයන්</Text>
          <FlatList
            data={CATEGORIES}
            renderItem={renderCategory}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 20 }}
          />
        </View>

        {/* PROMO BANNER */}
        <TouchableOpacity
          style={styles.promoBanner}
          onPress={() => navigation.navigate('PostAd')}
        >
          <View>
            <Text style={styles.promoText}>ඔබේ වාහනයත් ඉක්මනින්</Text>
            <Text style={styles.promoBold}>විකුණා ගන්න අදම පල කරන්න!</Text>
          </View>
          <View style={styles.plusCircle}>
            <Text style={styles.plusText}>+</Text>
          </View>
        </TouchableOpacity>

        {/* RECENT ADS SECTION */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>අලුත්ම දැන්වීම්</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Saved')}>
              <Text style={styles.seeAll}>සියල්ල</Text>
            </TouchableOpacity>
          </View>

          {RECENT_ADS.map(ad => (
            <TouchableOpacity key={ad.id} style={styles.adCard}>
              <Image source={{ uri: ad.image }} style={styles.adImage} />
              <View style={styles.adInfo}>
                <Text style={styles.adTitle} numberOfLines={1}>
                  {ad.title}
                </Text>
                <Text style={styles.adPrice}>{ad.price}</Text>
                <Text style={styles.adLocation}>
                  {ad.location} • {ad.time}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>

      <MobileBottomNavbar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_LIGHT,
  },
  header: {
    backgroundColor: PRIMARY,
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 25,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  brandTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  profileBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileIcon: { fontSize: 20 },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 5,
    alignItems: 'center',
    elevation: 5,
  },
  searchInput: {
    flex: 1,
    height: 45,
    paddingHorizontal: 15,
    fontSize: 14,
    color: '#333',
  },
  searchBtn: {
    backgroundColor: PRIMARY,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 12,
  },
  section: {
    marginTop: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  seeAll: {
    color: PRIMARY,
    fontWeight: 'bold',
  },
  catCard: {
    backgroundColor: 'white',
    width: 100,
    height: 100,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#eee',
  },
  catIcon: { fontSize: 30, marginBottom: 5 },
  catTitle: { fontSize: 12, fontWeight: 'bold', color: '#555' },
  promoBanner: {
    backgroundColor: PRIMARY,
    marginHorizontal: 20,
    marginTop: 25,
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  promoText: { color: 'white', fontSize: 14 },
  promoBold: { color: GOLD, fontSize: 16, fontWeight: 'bold' },
  plusCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: GOLD,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusText: { fontSize: 24, fontWeight: 'bold', color: PRIMARY },
  adCard: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 20,
    overflow: 'hidden',
    flexDirection: 'row',
    elevation: 3,
  },
  adImage: {
    width: 120,
    height: 100,
  },
  adInfo: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  adTitle: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  adPrice: {
    fontSize: 15,
    fontWeight: 'bold',
    color: PRIMARY,
    marginVertical: 4,
  },
  adLocation: { fontSize: 12, color: '#888' },
});

export default HomeScreen;
