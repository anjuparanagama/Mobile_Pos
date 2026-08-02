import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import {
  DollarSign,
  ShoppingCart,
  Package,
  TrendingUp,
  AlertTriangle,
  CreditCard,
  Banknote,
  QrCode,
} from 'lucide-react-native';

import { LineChart, PieChart } from 'react-native-chart-kit';
import Header from '../../component/header';
import MenuBar from '../../component/menuBar';

const { width } = Dimensions.get('window');

const PRIMARY = '#7B468C';
const GOLD = '#9A6AB2';
const BG_LIGHT = '#F4F7F6';

const AnalyticsScreen = () => {
  const stats = [
    {
      title: 'Today Total Sales',
      value: 'Rs. 245,000',
      icon: <DollarSign size={28} color={PRIMARY} />,
    },
    {
      title: 'Today Sales Count',
      value: '356',
      icon: <ShoppingCart size={28} color={PRIMARY} />,
    },
    /*     {
      title: 'Profit',
      value: 'Rs. 85,000',
      icon: <TrendingUp size={28} color={PRIMARY} />,
    },
    {
      title: 'Low Stock Items',
      value: '1,240',
      icon: <Package size={28} color={PRIMARY} />,
    }, */
  ];

  const topProducts = [
    {
      name: 'Coca Cola 500ml',
      sold: '245 Units',
    },
    {
      name: 'Rice 5Kg',
      sold: '180 Units',
    },
    {
      name: 'Milk Powder',
      sold: '120 Units',
    },
  ];

  const lowStock = [
    {
      name: 'Rice 5Kg',
      qty: '5 left',
    },
    {
      name: 'Sugar 1Kg',
      qty: '8 left',
    },
  ];

  const transactions = [
    {
      id: '#INV001',
      item: 'Burger x2',
      amount: 'Rs.1200',
    },
    {
      id: '#INV002',
      item: 'Coffee x1',
      amount: 'Rs.350',
    },
    {
      id: '#INV003',
      item: 'Pizza x1',
      amount: 'Rs.2500',
    },
  ];

  const salesData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [1200, 1800, 1500, 2500, 2200, 3000, 2200],
      },
    ],
  };

  const paymentData = [
    {
      name: 'Cash',
      amount: 45,
      color: PRIMARY,
      legendFontColor: '#555',
      legendFontSize: 12,
    },
    {
      name: 'Card',
      amount: 35,
      color: GOLD,
      legendFontColor: '#555',
      legendFontSize: 12,
    },
    {
      name: 'QR',
      amount: 20,
      color: '#888',
      legendFontColor: '#555',
      legendFontSize: 12,
    },
  ];

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 70,
        }}
      >
        {/* Stats */}

        <View style={styles.grid}>
          {stats.map((item, index) => (
            <View key={index} style={styles.statCard}>
              <View style={styles.iconBox}>{item.icon}</View>

              <Text style={styles.statTitle}>{item.title}</Text>

              <Text style={styles.value}>{item.value}</Text>
            </View>
          ))}
        </View>

        {/* Sales Chart */}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sales Overview</Text>

          <LineChart
            data={salesData}
            width={width - 40}
            height={220}
            chartConfig={{
              backgroundGradientFrom: '#fff',
              backgroundGradientTo: '#fff',
              decimalPlaces: 0,
              color: () => PRIMARY,
              labelColor: () => '#555',

              propsForLabels: {
                fontSize: 11,
              },
            }}
            bezier
            withInnerLines={false}
            withOuterLines={false}
            style={styles.chart}
          />
        </View>

        {/* Payment */}

        {/*         <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Methods</Text>

          <PieChart
            data={paymentData}
            width={width - 40}
            height={180}
            chartConfig={{
              color: () => PRIMARY,
            }}
            accessor="amount"
            backgroundColor="transparent"
            paddingLeft="15"
          />
        </View> */}

        {/* Top Products */}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔥 Top Selling Products</Text>

          {topProducts.map((item, index) => (
            <View key={index} style={styles.listCard}>
              <Text style={styles.itemName}>
                {index + 1}. {item.name}
              </Text>

              <Text style={styles.itemValue}>{item.sold}</Text>
            </View>
          ))}
        </View>

        {/* Low Stock */}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⚠ Low Stock</Text>

          {lowStock.map((item, index) => (
            <View key={index} style={styles.listCard}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <AlertTriangle size={22} color="red" />

                <Text style={styles.itemName}>{item.name}</Text>
              </View>

              <Text
                style={{
                  color: 'red',
                  fontWeight: 'bold',
                }}
              >
                {item.qty}
              </Text>
            </View>
          ))}
        </View>

        {/* Transactions */}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>

          {transactions.map((item, index) => (
            <View key={index} style={styles.listCard}>
              <View>
                <Text style={styles.itemName}>{item.id}</Text>

                <Text style={styles.small}>{item.item}</Text>
              </View>

              <Text style={styles.itemValue}>{item.amount}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
      <MenuBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_LIGHT,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },

  subTitle: {
    color: '#ddd',
    marginTop: 5,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 20,
  },

  statCard: {
    width: (width - 55) / 2,
    backgroundColor: '#fff',
    height: 130,
    borderRadius: 10,
    padding: 15,
    marginBottom: 0,
    elevation: 3,
  },

  iconBox: {
    marginBottom: 10,
  },

  statTitle: {
    color: '#777',
    fontSize: 13,
  },

  value: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
    color: '#333',
  },

  section: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    elevation: 2,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },

  chart: {
    borderRadius: 10,
    marginLeft: -15,
  },

  listCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },

  itemName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },

  itemValue: {
    fontWeight: 'bold',
    color: PRIMARY,
  },

  small: {
    fontSize: 12,
    color: '#888',
    marginTop: 3,
  },
});

export default AnalyticsScreen;
