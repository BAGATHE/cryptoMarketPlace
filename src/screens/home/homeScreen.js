import React, { useState } from 'react';
import { StyleSheet, View, ScrollView,TouchableOpacity} from 'react-native';
import {
  Appbar,
  Text,
  Card,
  IconButton,
  List,
  Button,
  Drawer,
  Avatar, 
  useTheme,
} from 'react-native-paper';
const initialCryptomonnaies = [
  { id: 1, icon: 'bitcoin', title: 'Bitcoin', subtitle: 'BTC', amount: '98000 USD', color: '#FF9900', isFavorite: false },
  { id: 2, icon: 'ethereum', title: 'Ethereum', subtitle: 'ETH', amount: '3000 USD', color: '#3C3C3D', isFavorite: true },
  { id: 3, icon: 'litecoin', title: 'Litecoin', subtitle: 'LTC', amount: '400 USD', color: '#BEBEBE', isFavorite: false },
  { id: 4, icon: 'exchange', title: 'Exchange Token', subtitle: 'USDT', amount: '1 USD', color: '#26A17B', isFavorite: true },
];
const actions = [
  { icon: 'bank-plus', label: 'Dépôt', route: 'DepositPage' },
  { icon: 'bank-minus', label: 'Retrait', route: 'WithdrawalPage' },
  { icon: 'wallet', label: 'Wallet', route: 'WalletPage' }
];
export default function HomeScreen({ navigation }) {
  const theme = useTheme();
  const [drawerVisible, setDrawerVisible] = React.useState(false);
  const [fond,setFond] = useState(25000)
  const toggleDrawer = () => setDrawerVisible(!drawerVisible);
  const [cryptomonnaiesList, setCryptoMonnaieList] = useState(initialCryptomonnaies);
  
  const toggleFavorite = (id) => {
    setCryptoMonnaieList(prevList =>
      prevList.map(cryptomonnaie =>
        cryptomonnaie.id === id ? { ...cryptomonnaie, isFavorite: !cryptomonnaie.isFavorite } : cryptomonnaie
      )
    );
  };

  return (
    <>
      {/* Appbar */}
      <Appbar.Header>
        <Appbar.Action icon="menu" onPress={toggleDrawer} />
        <View style={styles.headerContent}>
          <Text style={styles.welcomeText}>Welcome back</Text>
        </View>
        <Appbar.Action icon="magnify" onPress={() => {}} />
      </Appbar.Header>

      {/* Drawer Content */}
      {drawerVisible && (
        <Drawer.Section style={styles.drawer}>
          <Drawer.Item
            icon="home"
            label="Home"
            onPress={() => {
              setDrawerVisible(false);
              navigation.navigate('Home');
            }}
          />
          <Drawer.Item
            icon="credit-card"
            label="My Cards"
            onPress={() => {
              setDrawerVisible(false);
              navigation.navigate('Landing');
            }}
          />
          <Drawer.Item
            icon="chart-bar"
            label="Statistics"
            onPress={() => {
              setDrawerVisible(false);
              navigation.navigate('Statistics');
            }}
          />
          <Drawer.Item
            icon="cog"
            label="Settings"
            onPress={() => {
              setDrawerVisible(false);
              navigation.navigate('Settings');
            }}
          />
        </Drawer.Section>
      )}

      {/* Content */}
      <ScrollView style={styles.container}>
        {/* Card Section */}
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.fond}>{fond}</Text>
            <View style={styles.cardDetails}>
              <View>
                <Text>Emadaly </Text>
                <Text>24/2000</Text>
              </View>
              <Avatar.Image size={96} source={require('../../assets/images/profil.jpg')} />
            </View>
          </Card.Content>
        </Card>

        {/* Actions */}
        <View style={styles.actions}>
          {actions.map((action, index) => (
           <TouchableOpacity 
           key={index} 
           style={styles.actionItem} 
           onPress={() => navigation.navigate(action.route)}
           >
           <IconButton 
             icon={action.icon} 
           />
           <Text>{action.label}</Text>
         </TouchableOpacity>
          ))}
       </View>

        {/* Transactions */}
        <View style={styles.transactionHeader}>
          <Text>Cryptomonnaie</Text>
          <Button mode="text" textColor={theme.colors.primary}>
            Cours Actuel
          </Button>
        </View>
        {cryptomonnaiesList.map((cryptomonnaie) => (
        <List.Item
          key={cryptomonnaie.id}
          title={cryptomonnaie.title}
          description={cryptomonnaie.subtitle}
          left={() => <List.Icon icon={cryptomonnaie.icon} color={cryptomonnaie.color} />}
          right={() => (
            <View style={styles.rightContainer}>
              <Text
                style={[
                  styles.amount,
                  { color: cryptomonnaie.amount.startsWith('-') ? 'red' : theme.colors.primary },
                ]}
              >
                {cryptomonnaie.amount}
              </Text>
              <IconButton
                icon={cryptomonnaie.isFavorite ? 'heart' : 'heart-outline'}
                color={cryptomonnaie.isFavorite ? 'red' : 'black'}
                onPress={() => toggleFavorite(cryptomonnaie.id)}
              />
            </View>
          )}
        />
      ))}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        {['home', 'credit-card', 'chart-bar', 'cog'].map((icon, index) => (
          <IconButton key={index} icon={icon} />
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerContent: {
    flex: 1,
    marginLeft: 10,
  },
  welcomeText: {
    color: '#666',
  },
  username: {
    fontWeight: 'bold',
  },
  card: {
    margin: 16,
    backgroundColor: '#1a237e',
  },
  fond: {
    color: 'white',
    fontSize: 20,
    letterSpacing: 2,
  },
  cardDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
  },
  actionItem: {
    alignItems: 'center',
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  amount: {
    fontWeight: 'bold',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingVertical: 8,
  },
  drawer: {
    backgroundColor: '#fff',
  },
  amount: {
    fontSize: 16,
    alignSelf: 'center',
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
