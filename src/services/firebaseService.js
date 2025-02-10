import database from '@react-native-firebase/database';
import messaging from '@react-native-firebase/messaging';

export const sendLoginRequest = async (email, mdp) => {
  const requestRef = database().ref('/requests').push();
  const requestId = requestRef.key;

  const requestData = {
    type: "LOGIN",
    status: "pending",
    email:email,
    mdp:mdp,
    response:"",
  };

  await requestRef.set(requestData);

  return requestId;
};

export const listenLoginResponse = (requestId, onResponse) => {
  if (!requestId) {
    console.error("Request ID is null or undefined");
    return;
  }

  const responseRef = database().ref(`/requests/${requestId}`);

  responseRef.on('value', (snapshot) => {
    const data = snapshot.val();
    if (data) {
      onResponse(data);
      if (data.status === "success" || data.status === "failed") {
        responseRef.off();
      }
    }
  });
};




export const updateOtpStatus = async (requestId, otp) => {
  try {
    const otpRef = database().ref(`/requests/${requestId}`);
    await otpRef.update({
      type: "AUTHENTIFICATION",
      otp: otp,
      status: "verifying",
    });
    otpRef.off();
  } catch (error) {
    throw new Error("Failed to update OTP status.");
  }
};

// Fonction pour sauvegarder le token FCM dans Firebase
export const saveFCMTokenToFirebase = async (userKey, email) => {
  try {
    const token = await messaging().getToken();
    
    if (userKey) {
      const utilisateurRef = database().ref(`/utilisateurs/${userKey}`);
      await utilisateurRef.update({ fcmtoken: token });
      console.log(`Token FCM enregistré avec succès pour l’utilisateur : ${email}`);
    } else {
      console.warn("Impossible d'enregistrer le token : clé utilisateur introuvable.");
    }
  } catch (error) {
    console.error('Erreur lors de la sauvegarde du token FCM :', error);
  }
};

export const waitForResponse = async (responseRef) => {
          return new Promise((resolve) => {
            const checkResponse = (snapshot) => {
              const data = snapshot.val();

              if (data?.response && data.response.trim() !== "") {
                responseRef.off("value", checkResponse); // Arrêter l'écoute une fois les données reçues
                resolve(data);
              }
            };
  
            // Écoute en boucle jusqu'à ce que response soit rempli
            responseRef.on("value", checkResponse);
          });
};


// Fonction pour rechercher un utilisateur par email (centralise la logique de recherche)
export const findUserByEmail = async (email) => {
  try {
    const userRef = database().ref('/utilisateurs');
    const userSnapshot = await userRef.once('value');
    const users = userSnapshot.val();

    let matchingUser = null;
    let matchingUserKey = null;

    if (users) {
      for (const [key, user] of Object.entries(users)) {
        if (user && user.email === email) {
          matchingUser = user;
          matchingUserKey = key;
          break;
        }
      }
    }

    return { matchingUser, matchingUserKey };
  } catch (error) {
    console.error("Erreur lors de la recherche de l'utilisateur :", error);
    return { matchingUser: null, matchingUserKey: null };
  }
};



// Fonction pour gérer l'authentification de l'utilisateur
export const handleUserAuthentication = async (email) => {
  try {
    const { matchingUser, matchingUserKey } = await findUserByEmail(email);

    if (matchingUserKey && matchingUserKey.trim() !== "") {
      await saveFCMTokenToFirebase(matchingUserKey, email);
    } else {
      await addNewUser(email);
    }
  } catch (error) {
    console.error("Erreur lors de l'authentification de l'utilisateur :", error);
  }
};

// Fonction pour ajouter un nouvel utilisateur
export const addNewUser = async (email) => {
  try {
    const newUserRef = database().ref('/utilisateurs').push();
    const newUserData = {
      email: email,
      favoris: {},  
      fond: 0, 
      id:"",  // Assigne l'ID unique généré par Firebase
      profil: "",
    };

    await newUserRef.set(newUserData);

    // On utilise directement la clé générée pour sauvegarder le token FCM
    await saveFCMTokenToFirebase(newUserRef.key, email);
  } catch (error) {
    console.error("Erreur lors de l'ajout d'un nouvel utilisateur :", error);
  }
};


export const listenChangeFond = (userKey, onResponse) => {
  if (!userKey) {
    console.error("userKey est null");
    return;
  }
  const responseRef = database().ref(`/utilisateurs/${userKey}/fond`);
  
  responseRef.on('value', (snapshot) => {
    const data = snapshot.val();
    if (data !== null && data !== undefined) {
      onResponse(data);
    }
  });

  // Nettoyage de l'écouteur
  return () => responseRef.off('value');
};
