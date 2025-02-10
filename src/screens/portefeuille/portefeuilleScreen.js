import CryptoCard from '@components/crypto/CryptoCard';
import React,{useState,useEffect} from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Appbar, Text, Surface, Title, useTheme,Button} from 'react-native-paper';
import { useRoute } from "@react-navigation/native";
import database from '@react-native-firebase/database';
import {findUserByEmail} from '@services/firebaseService';
export default function PortefeuilleScreen({ navigation }) {
  const route = useRoute();
  const theme = useTheme();
  const { email } = route.params;
  const [userEmail,setUserEmail] = useState("");
  const [cryptoData, setCryptoData] = useState([]);
  const [userKey, setUserKey] = useState(null);  // Stocke la clé utilisateur dans un état

  useEffect(() => {
    if (email) {
      const fetchUserData = async () => {
        try {
          const { matchingUserKey } = await findUserByEmail(email);  
          setUserKey(matchingUserKey); 
          setUserEmail(email);
          console.log("user key ==" + userKey);
        } catch (error) {
          console.error("Erreur lors de la récupération de l'utilisateur :", error);
        }
      };

      fetchUserData();  
    }
  }, [email]);

   useEffect(() => {
    if (userKey) {
      const portefeuilleRef = database().ref(`/utilisateurs/${userKey}/porteFeuille`);

      const portefeuilleListener = portefeuilleRef.on('value', snapshot => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const cryptoArray = Object.values(data);
          console.log("tab crypto" + cryptoArray.length);
          setCryptoData(cryptoArray);
        } else {
          setCryptoData([]); 
        }
      });
      return () => portefeuilleRef.off('value', portefeuilleListener);
    }
  }, [userKey]);
  return (
    <View style={styles.container}>
      <Appbar.Header style={[styles.appBar, { backgroundColor: '#002967' }]}>
        <Appbar.BackAction onPress={() => navigation.goBack()} color="white" />
        <Appbar.Content title="Mon Portefeuille" color="white" />
        <Appbar.Action icon="bell-outline" onPress={() => {}} color="white" />
      </Appbar.Header>

      <ScrollView style={styles.scrollView}>
      <Surface style={styles.headerCard}>
        <Text style={styles.portfolioLabel}>Historique achat et vente</Text>
        <Button
        mode="contained"
        onPress={() => navigation.navigate('HistoriqueAV', { email: userEmail })}
        style={styles.button}
        >
          Voir 
        </Button>
      </Surface>

        <Title style={styles.sectionTitle}>Mes Actifs</Title>

        {cryptoData && cryptoData.length > 0 ? (
          cryptoData.map((crypto) => (
            crypto && Object.keys(crypto).length > 0 ? (
            <CryptoCard key={crypto.id} crypto={crypto} />
          ) : null
        ))
      ) : (
      <Text>Aucune donnée crypto disponible.</Text>
      )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  appBar: {
    elevation: 0,
  },
  scrollView: {
    flex: 1,
  },
  headerCard: {
    margin: 16,
    padding: 20,
    borderRadius: 12,
    backgroundColor: 'white',
    elevation: 4,
  },
  portfolioLabel: {
    fontSize: 16,
    color: '#666',
    textAlign:'center'
  },
  totalValue: {
    fontSize: 36,
    fontWeight: 'bold',
    marginVertical: 8,
    color: '#002967',
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeText: {
    fontSize: 16,
    fontWeight: '500',
  },
  sectionTitle: {
    marginLeft: 16,
    marginTop: 8,
    marginBottom: 8,
    color: '#002967',
  },
  cryptoCard: {
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    elevation: 2,
  },
  button:{
    backgroundColor: '#002967',
  },


  
 
 
 

  amount: {
    fontSize: 16,
    fontWeight: '500',
  },
});