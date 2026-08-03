import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Feather from 'react-native-vector-icons/Feather';

const PRIMARY = '#7B468C';

export default function Header() {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentDate.getHours();

    if (hour < 12) {
      return 'Good Morning';
    }

    if (hour < 17) {
      return 'Good Afternoon';
    }

    return 'Good Evening';
  };

  const formatDate = () => {
    return currentDate.toLocaleDateString('en-US', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  const formatTime = () => {
    return currentDate.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <View style={styles.container}>
      {/* Left Greeting */}

      <View>
        <Text style={styles.greeting}>{getGreeting()}</Text>

        <Text style={styles.subText}>Welcome back 👋</Text>
      </View>

      {/* Right Date & Time */}

      <View style={styles.dateBox}>
        <View style={styles.row}>
          <Feather name="calendar" size={15} color={PRIMARY} />

          <Text style={styles.dateText}>{formatDate()}</Text>
        </View>

        <View style={styles.row}>
          <Feather name="clock" size={15} color={PRIMARY} />

          <Text style={styles.dateText}>{formatTime()}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',

    paddingHorizontal: 20,

    paddingVertical: 18,

    flexDirection: 'row',

    justifyContent: 'space-between',

    alignItems: 'center',
  },

  greeting: {
    fontSize: 22,

    fontWeight: '800',

    color: '#222',
  },

  subText: {
    marginTop: 4,

    fontSize: 13,

    color: '#8A8A8A',
  },

  dateBox: {
    alignItems: 'flex-end',

    gap: 8,

    maxWidth: 190,
  },

  row: {
    flexDirection: 'row',

    alignItems: 'center',

    gap: 6,
  },

  dateText: {
    fontSize: 12,

    color: '#555',

    fontWeight: '600',

    textAlign: 'right',
  },
});
