import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import {
  Appbar,
  Text,
  Card,
  IconButton,
  List,
  Button,
  Drawer,
  useTheme,
} from 'react-native-paper';

export default function HomeScreen({ navigation }) {
  const theme = useTheme();
  const [drawerVisible, setDrawerVisible] = React.useState(false);

  const toggleDrawer = () => setDrawerVisible(!drawerVisible);

  const cardNumber = '4562 1122 4595 7852';
  const transactions = [
    { icon: 'apple', title: 'Apple Store', subtitle: 'Entertainment', amount: '-$5.99', color: '#000' },
    { icon: 'spotify', title: 'Spotify', subtitle: 'Music', amount: '-$12.99', color: '#1DB954' },
    { icon: 'bank-transfer', title: 'Money Transfer', subtitle: 'Transaction', amount: '$300', color: '#4A90E2' },
    { icon: 'cart', title: 'Grocery', subtitle: 'Shopping', amount: '-$88', color: '#FF6B6B' },
  ];

  return (
    <>
      {/* Appbar */}
      <Appbar.Header>
        <Appbar.Action icon="menu" onPress={toggleDrawer} />
        <View style={styles.headerContent}>
          <Text style={styles.welcomeText}>Welcome back,</Text>
          <Text style={styles.username}>Tanya Myroniuk</Text>
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
            <Text style={styles.cardNumber}>{cardNumber}</Text>
            <View style={styles.cardDetails}>
              <View>
                <Text>AR Jonson</Text>
                <Text>24/2000</Text>
              </View>
              <IconButton icon="credit-card" size={24} />
            </View>
          </Card.Content>
        </Card>

        {/* Actions */}
        <View style={styles.actions}>
          {['arrow-up', 'arrow-down', 'currency-usd', 'plus'].map((icon, index) => (
            <View key={index} style={styles.actionItem}>
              <IconButton icon={icon} />
              <Text>{icon === 'arrow-up' ? 'Send' : icon === 'arrow-down' ? 'Receive' : icon === 'currency-usd' ? 'Loan' : 'Topup'}</Text>
            </View>
          ))}
        </View>

        {/* Transactions */}
        <View style={styles.transactionHeader}>
          <Text>Transaction</Text>
          <Button mode="text" textColor={theme.colors.primary}>
            See All
          </Button>
        </View>
        {transactions.map((transaction, index) => (
          <List.Item
            key={index}
            title={transaction.title}
            description={transaction.subtitle}
            left={() => <List.Icon icon={transaction.icon} color={transaction.color} />}
            right={() => (
              <Text style={[styles.amount, { color: transaction.amount.startsWith('-') ? 'red' : theme.colors.primary }]}>
                {transaction.amount}
              </Text>
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
  cardNumber: {
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
});
