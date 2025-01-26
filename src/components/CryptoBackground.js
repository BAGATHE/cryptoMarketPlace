import React, { useEffect } from 'react';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withTiming, 
  Easing 
} from 'react-native-reanimated';
import { View, StyleSheet, Image } from 'react-native';

const FloatingCrypto = ({ source, size = 50, duration = 2000 }) => {
  const translateY = useSharedValue(0);

  useEffect(() => {
    translateY.value = withRepeat(
      withTiming(-20, { 
        duration, 
        easing: Easing.ease 
      }),
      -1, 
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <Animated.View style={[styles.cryptoContainer, animatedStyle]}>
      <Image source={source} style={{ width: size, height: size }} />
    </Animated.View>
  );
};

const CryptoBackground = () => {
  return (
    <View style={styles.container}>
      <FloatingCrypto 
        source={require('../assets/images/bitcoin.png')} 
        size={60} 
      />
      <FloatingCrypto 
        source={require('../assets/images/wallet.png')} 
        size={50} 
        duration={2500} 
      />
      <FloatingCrypto 
        source={require('../assets/images/ethereum.png')} 
        size={55} 
        duration={1800} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute', 
    bottom: 0, 
    width: '100%', 
    flexDirection: 'row', 
    justifyContent: 'space-around',
    paddingBottom: 20,
  },
  cryptoContainer: {
    opacity: 0.7,
  }
});

export default CryptoBackground;