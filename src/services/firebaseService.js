import database from '@react-native-firebase/database';

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



