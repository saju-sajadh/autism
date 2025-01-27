import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { router } from "expo-router";
import { useSignIn } from "@clerk/clerk-expo";
import { useAuth } from "@clerk/clerk-expo";

const SigninScreen = () => {

  const { isSignedIn } = useAuth()
  const { isLoaded, signIn, setActive } = useSignIn()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [isloading, setIsloading] = useState(false)
  const [toggleEye, setToggleEye] = useState(false)

  if(isSignedIn){
    router.replace('/home')
  }


  const handleInputChange = (name, value) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSignin = async () => {
    if (!isLoaded) {
      return
    }
    if(!formData.email || !formData.password){
      Alert.alert('warning', 'Please fill the fields!')
      return
    }
    try {
      const signInAttempt = await signIn.create({
        identifier: formData.email,
        password: formData.password,
      })

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace('/home')
      } else {
        Alert.alert('warning', 'Invaid Credentials!')
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err) {
      Alert.alert('Error', 'Invaid Credentials!')
      console.error(JSON.stringify(err, null, 2))
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButtonWrapper} onPress={() => { router.replace('/'); }}>
        <Ionicons name={"arrow-back-outline"} color={'#45484A'} size={25} />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.headingText}>Let's get</Text>
        <Text style={styles.headingText}>started</Text>
      </View>
      <View style={styles.formContainer}>
      <View style={styles.inputContainer}>
          <Ionicons name={"mail-outline"} size={30} color={'#AEB5BB'} />
          <TextInput
            style={styles.textInput}
            placeholder="Enter your email"
            placeholderTextColor={'#AEB5BB'}
            keyboardType="email-address"
            value={formData.email}
            onChangeText={(value) => handleInputChange('email', value)} // Update state on input change
          />
        </View>
        <View style={styles.inputContainer}>
          <SimpleLineIcons name={"lock"} size={30} color={'#AEB5BB'} />
          <TextInput
            style={styles.textInput}
            placeholder="Enter your password"
            placeholderTextColor={'#AEB5BB'}
            secureTextEntry={!toggleEye ? true : false}
            value={formData.password}
            onChangeText={(value) => handleInputChange('password', value)} // Update state on input change
          />
          <TouchableOpacity
            onPress={() => {
              // Implement password visibility toggle if needed
              setToggleEye(!toggleEye)
            }}
          >
            <Ionicons name={toggleEye ? "eye" : "eye-off"} size={20} color={'#AEB5BB'} />
          </TouchableOpacity>
        </View> 
        <TouchableOpacity style={styles.loginButtonWrapper} onPress={handleSignin}>
          <Text style={styles.loginText}>Sign in</Text>
        </TouchableOpacity>
        <View style={styles.footerContainer}>
          <Text style={styles.accountText}>Don't have an account!</Text>
          <TouchableOpacity onPress={() => {router.replace('/sign-up') }}>
            <Text style={styles.signupText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SigninScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
    paddingTop: 40,
  },
  backButtonWrapper: {
    height: 40,
    width: 40,
    backgroundColor: '#D9D9D9',
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    marginVertical: 20,
  },
  headingText: {
    fontSize: 32,
    color: '#45484A',
  },
  formContainer: {
    marginTop: 20,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#AEB5BB',
    borderRadius: 100,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    padding: 2,
    marginVertical: 10,
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 10,
  },
  forgotPasswordText: {
    textAlign: "right",
    color: '#45484A',
    marginVertical: 10,
  },
  loginButtonWrapper: {
    backgroundColor: '#45484A',
    borderRadius: 100,
    marginTop: 20,
  },
  loginText: {
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: "center",
    padding: 10,
  },
  continueText: {
    textAlign: "center",
    marginVertical: 20,
    fontSize: 14,
    color: '#45484A',
  },
  googleButtonContainer: {
    flexDirection: "row",
    borderWidth: 2,
    borderColor: '#45484A',
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    gap: 10,
  },
  googleImage: {
    height: 20,
    width: 20,
  },
  googleText: {
    fontSize: 20,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    gap: 5,
  },
  accountText: {
    color: '#45484A',
  },
  signupText: {
    color: '#45484A',
  },
});
