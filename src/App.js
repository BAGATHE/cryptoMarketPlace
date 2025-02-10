
import React,{useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingScreen from '@screens/landing/landingScreen';
import SignIn from '@screens/authentification/signInScreen';
import HomeScreen from '@screens/home/homeScreen';
import ProfilScreen from '@screens/profil/profilScreen';
import DepotScreen from '@screens/fond/depotScreen';
import RetraitScreen from '@screens/fond/retraitScreen';
import PortefeuilleScreen from '@screens/portefeuille/portefeuilleScreen';
import TransactionHistoryScreen from '@screens/portefeuille/transactionHistoryScreen';
import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function MainStack() {
    //gerer les notifications
    useEffect(() => {
      // Créer le canal de notification pour Android 8.0+
      if (Platform.OS === 'android') {
        PushNotification.createChannel(
          {
            channelId: "default_channel", // ID du canal
            channelName: "Default Channel", // Nom du canal
            channelDescription: "Channel for default notifications", // Description
            soundName: "default",
            importance: 4, // Haute importance
            vibrate: true,
          },
          (created) => console.log(`createChannel returned '${created}'`) // Callback
        );
      }
  
      // Demander la permission pour les notifications (facultatif pour Android)
      const requestPermission = async () => {
        const authStatus = await messaging().requestPermission();
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
        if (enabled) {
          console.log('Authorization status:', authStatus);
        }
      };
  
      requestPermission();
  
     
  
      // Écouter les messages quand l'application est au premier plan
      const unsubscribe = messaging().onMessage(async remoteMessage => {
        PushNotification.localNotification({
          /* Android Only Properties */
          channelId: "default_channel",
          /* iOS and Android properties */
          title: remoteMessage.notification.title,
          message: remoteMessage.notification.body,
        });
      });
  
      return unsubscribe;
    }, []);
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Landing" component={LandingScreen} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Profil" component={ProfilScreen} />
      <Stack.Screen name="Depot" component={DepotScreen} />
      <Stack.Screen name="Retrait" component={RetraitScreen} />
      <Stack.Screen name="PorteFeuille" component={PortefeuilleScreen} />
      <Stack.Screen name="HistoriqueAV" component={TransactionHistoryScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
      <NavigationContainer>
        <MainStack />
      </NavigationContainer>
  );
}
