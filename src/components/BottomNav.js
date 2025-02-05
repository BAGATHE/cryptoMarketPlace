import React from 'react';
import { View, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';

export default function BottomNav({ navigation ,userId}) {
  const handleNavigation = (route) => {
    navigation.navigate(route,{ userId: userId });
  };

  return (
    <View style={styles.bottomNav}>
      {/* Utilisez le tableau pour rendre les icônes et associer chaque icône à une page via navigation */}
      {['Home', 'PorteFeuille', 'HistoriqueAV'].map((route, index) => (
        <IconButton
          key={index}
          icon={route === 'Home' ? 'home' : route === 'PorteFeuille' ? 'credit-card' : 'chart-bar'}
          onPress={() => handleNavigation(route)} 
          size={30}
          color="#000"
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
});
