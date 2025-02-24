// biometrics.js

document.getElementById("login-btn").addEventListener("click", async () => {
  if (!window.PublicKeyCredential) {
      alert("WebAuthn is not supported on this browser.");
      return;
  }
  
  try {
      const credential = await navigator.credentials.create({
          publicKey: {
              challenge: new Uint8Array(32),
              rp: { name: "Recipe Organizer" },
              user: {
                  id: new Uint8Array(16),
                  name: "user@example.com",
                  displayName: "User"
              },
              pubKeyCredParams: [{ type: "public-key", alg: -7 }],
              authenticatorSelection: { authenticatorAttachment: "platform" },
              timeout: 60000,
              attestation: "direct"
          }
      });
      console.log("Biometric login success: ", credential);
  } catch (error) {
      console.error("Biometric authentication failed: ", error);
  }
});


