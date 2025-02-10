import React, { useState,useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Alert } from "react-native";
import { Appbar, Avatar, Button, IconButton, useTheme } from "react-native-paper";
import { launchCamera } from "react-native-image-picker";
import database from "@react-native-firebase/database";
import { useRoute } from "@react-navigation/native";
import {findUserByEmail} from '@services/firebaseService';
// Config Cloudinary
const CLOUDINARY_CLOUD_NAME = "dfmtnmryt";
const CLOUDINARY_UPLOAD_PRESET = "rojo_examen";

export default function ProfileScreen({ navigation }) {
  const route = useRoute();
  const { email } = route.params;
  const [profileImage, setProfileImage] = useState(require("../../assets/images/user.png"));
  const [selectedImage, setSelectedImage] = useState(null); // Stocke l'image prise sans l'envoyer
  const [uploading, setUploading] = useState(false);
  const theme = useTheme();
  const [userKey, setUserKey] = useState(null);

  useEffect(() => {
    if (email) {
      const fetchUserKey = async () => {
        try {
          const { matchingUserKey } = await findUserByEmail(email);
          setUserKey(matchingUserKey);
        } catch (error) {
          console.error("Erreur lors de la récupération de la clé utilisateur :", error);
        }
      };

      fetchUserKey();
    }
  }, [email]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userRef = database().ref(`/utilisateurs/${userKey}/profil`);
        const snapshot = await userRef.once("value");
        const profilUrl = snapshot.val();

        if (profilUrl) {
          setProfileImage({ uri: profilUrl.replace('/upload/', '/upload/w_200,h_200,c_fill,q_auto,f_auto/') });
        } else {
          setProfileImage(require("../../assets/images/user.png"));
        }
      } catch (error) {
        console.error("Erreur lors de la récupération de l'image de profil :", error);
        setProfileImage(require("../../assets/images/user.png"));
      }
    };

    if (userKey) {
      fetchUserProfile();
    }
  }, [userKey]);

  const handleTakePhoto = () => {
    launchCamera(
      {
        mediaType: "photo",
        saveToPhotos: true,
      },
      (response) => {
        if (response.didCancel) {
          console.log("User cancelled camera");
        } else if (response.errorMessage) {
          console.error("Camera error: ", response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          const imageUri = response.assets[0].uri;
          setProfileImage({ uri: imageUri }); 
          setSelectedImage(imageUri); 
        }
      }
    );
  };

  const handleValidateChanges = async () => {
    if (!selectedImage) {
      console.log("Aucune image sélectionnée.");
      return;
    }

    setUploading(true);
    const imageUrl = await uploadImageToCloudinary(selectedImage);
    if (imageUrl) {
      await updateUserProfile(imageUrl);
      setSelectedImage(null); // Réinitialiser après upload réussi
    }
    setUploading(false);
  };

  const uploadImageToCloudinary = async (imageUri) => {
    const data = new FormData();
    data.append("file", {
      uri: imageUri,
      type: "image/jpeg",
      name: "profile.jpg",
    });
    data.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: data,
        }
      );

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const result = await response.json();
      return result.secure_url;
    } catch (error) {
      console.error("Erreur d'upload Cloudinary: ", error.message);
      return null;
    }
  };

  const updateUserProfile = async (imageUrl) => {
    try {
      await database().ref(`/utilisateurs/${userKey}/profil`).set(imageUrl);
      Alert.alert("Image de profil mise à jour ! changement apres reconnexion");
      navigation.navigate("Home", { email: email });
    } catch (error) {
      console.error("Erreur mise à jour Firebase: ", error);
    }
  };


  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* AppBar */}
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Modifier le Profil" />
      </Appbar.Header>

      {/* Content */}
      <View style={styles.content}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <Avatar.Image size={150} source={profileImage} style={styles.avatar} />
          <TouchableOpacity style={styles.editIconContainer} onPress={handleTakePhoto} disabled={uploading}>
            <IconButton
              icon={uploading ? "progress-upload" : "camera"}
              size={24}
              iconColor="#fff"
              style={styles.editIcon}
            />
          </TouchableOpacity>
          <Text style={styles.infoText}>
            {uploading ? "2 minute environs" : "Appuyez sur l'icône pour modifier votre photo."}
          </Text>
        </View>

        {/* Validation Button */}
        <View style={styles.buttonSection}>
          <Button
            mode="contained"
            onPress={handleValidateChanges}
            buttonColor={theme.colors.primary}
            style={styles.validateButton}
            labelStyle={styles.buttonText}
            disabled={uploading || !selectedImage} // Désactiver si aucun changement
          >
            {uploading ? "Envoi en cours..." : "Valider les modifications"}
          </Button>
        </View>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  profileSection: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  avatar: {
    marginBottom: 15,
  },
  editIconContainer: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "#007bff", // Bleu vif pour contraster avec l'avatar
    borderRadius: 50,
    padding: 5,
  },
  infoText: {
    fontSize: 14,
    color: "#6c757d",
    textAlign: "center",
    marginTop: 10,
  },
  buttonSection: {
    width: "100%",
    paddingHorizontal: 20,
  },
  validateButton: {
    borderRadius: 25,
    paddingVertical: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
