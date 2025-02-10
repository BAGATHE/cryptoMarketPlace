// FirebaseMessagingService.js
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
  PushNotification.localNotification({
    channelId: "default_channel",
    title: remoteMessage.notification.title,
    message: remoteMessage.notification.body,
  });
});