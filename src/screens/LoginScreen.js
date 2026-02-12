// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Image,
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import Feather from 'react-native-vector-icons/Feather';

// const LoginScreen = () => {
//   const navigation = useNavigation();
//   const [showPassword, setShowPassword] = useState(false);

//   const [customerId, setCustomerId] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [rememberMe, setRememberMe] = useState(false);
//   const [errors, setErrors] = useState({});

//   const validateEmail = email => {
//     const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return pattern.test(email);
//   };

//   const handleSignIn = () => {
//     const newErrors = {};
//     if (!customerId.trim()) newErrors.customerId = 'Customer ID is required';
//     if (!email.trim()) newErrors.email = 'Email is required';
//     else if (!validateEmail(email)) newErrors.email = 'Enter a valid email';
//     if (!password.trim()) newErrors.password = 'Password is required';

//     setErrors(newErrors);

//     if (Object.keys(newErrors).length === 0) {
//       navigation.replace('Main');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {/* Logo */}
//       <Image
//         source={require('../assets/images/logo.png')}
//         style={styles.logo}
//         resizeMode="contain"
//       />

//       <Text style={styles.heading}>Login to your Account</Text>

//       {/* Customer ID */}
//       <View style={styles.inputWrapper}>
//         <View style={styles.inputRow}>
//           <Feather name="user" size={18} color="#999" style={styles.icon} />
//           <TextInput
//             style={styles.input}
//             placeholder="Customer ID"
//             placeholderTextColor="#999"
//             value={customerId}
//             onChangeText={text => {
//               setCustomerId(text);
//               setErrors({ ...errors, customerId: '' });
//             }}
//           />
//         </View>
//         {errors.customerId ? (
//           <Text style={styles.errorText}>{errors.customerId}</Text>
//         ) : null}
//       </View>

//       {/* Email */}
//       <View style={styles.inputWrapper}>
//         <View style={styles.inputRow}>
//           <Feather name="mail" size={18} color="#999" style={styles.icon} />
//           <TextInput
//             style={styles.input}
//             placeholder="Email"
//             placeholderTextColor="#999"
//             value={email}
//             onChangeText={text => {
//               setEmail(text);
//               setErrors({ ...errors, email: '' });
//             }}
//             keyboardType="email-address"
//             autoCapitalize="none"
//           />
//         </View>
//         {errors.email ? (
//           <Text style={styles.errorText}>{errors.email}</Text>
//         ) : null}
//       </View>

//       {/* Password */}
//       <View style={styles.inputWrapper}>
//         <View style={styles.inputRow}>
//           <Feather name="lock" size={18} color="#999" style={styles.icon} />
//           <TextInput
//             style={[styles.input, { flex: 1 }]}
//             placeholder="Password"
//             placeholderTextColor="#999"
//             secureTextEntry={!showPassword}
//             value={password}
//             onChangeText={text => {
//               setPassword(text);
//               setErrors({ ...errors, password: '' });
//             }}
//           />
//           <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
//             <Feather
//               name={showPassword ? 'eye-off' : 'eye'}
//               size={18}
//               color="#999"
//             />
//           </TouchableOpacity>
//         </View>
//         {errors.password ? (
//           <Text style={styles.errorText}>{errors.password}</Text>
//         ) : null}
//       </View>

//       {/* Remember Me */}
//       <TouchableOpacity
//         style={styles.rememberRow}
//         onPress={() => setRememberMe(!rememberMe)}
//         activeOpacity={0.8}
//       >
//         <Feather
//           name={rememberMe ? 'check-square' : 'square'}
//           size={18}
//           color="#2B2162"
//         />
//         <Text style={styles.rememberText}>Remember me</Text>
//       </TouchableOpacity>

//       {/* Sign In */}
//       <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
//         <Text style={styles.signInText}>Sign in</Text>
//       </TouchableOpacity>

//       {/* Forgot Password */}
//       <TouchableOpacity activeOpacity={0.7}>
//         <Text style={styles.forgotText}>Forgot the password?</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default LoginScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     paddingHorizontal: 24,
//     paddingTop: 60,
//   },
//   logo: {
//     width: 120,
//     height: 120,
//     alignSelf: 'center',
//     marginBottom: 10,
//   },
//   heading: {
//     fontSize: 24,
//     fontWeight: '700',
//     color: '#212121',
//     fontFamily: 'Urbanist-Bold',
//     textAlign: 'center',
//     marginBottom: 32,
//     lineHeight: 35.2,
//   },
//   inputWrapper: {
//     marginBottom: 16,
//   },
//   inputRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#F6F6F6',
//     borderRadius: 12,
//     paddingHorizontal: 12,
//     height: 48,
//   },
//   icon: {
//     marginRight: 8,
//   },
//   input: {
//     flex: 1,
//     fontSize: 15,
//     fontFamily: 'Urbanist-Regular',
//     color: '#000',
//   },
//   errorText: {
//     color: 'red',
//     fontSize: 12,
//     fontFamily: 'Urbanist-Regular',
//     marginTop: 4,
//     marginLeft: 4,
//   },
//   rememberRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 12,
//     marginBottom: 24,
//     alignSelf: 'stretch',
//     justifyContent: 'center',
//   },
//   rememberText: {
//     fontSize: 14,
//     fontFamily: 'Urbanist-SemiBold',
//     color: '#212121',
//     lineHeight: 19.6,
//     letterSpacing: 0.2,
//   },
//   signInButton: {
//     height: 55,
//     backgroundColor: '#2B2162',
//     borderRadius: 100,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   signInText: {
//     color: '#fff',
//     fontSize: 16,
//     fontFamily: 'Urbanist-Bold',
//   },
//   forgotText: {
//     fontSize: 16,
//     fontFamily: 'Urbanist-SemiBold',
//     color: '#2B2162',
//     textAlign: 'center',
//     letterSpacing: 0.2,
//     lineHeight: 22.4,
//   },
// });

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import { useAuth } from '../context/AuthContext';

const LoginScreen = () => {
  const navigation = useNavigation();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [customerId, setCustomerId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateEmail = email => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  const handleSignIn = async () => {
    const newErrors = {};
    if (!customerId.trim()) newErrors.customerId = 'Customer ID is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!validateEmail(email)) newErrors.email = 'Enter a valid email';
    if (!password.trim()) newErrors.password = 'Password is required';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setLoading(true);

      const result = await login(email, password, customerId); // <-- updated

      setLoading(false);
      if (result.success) {
        Alert.alert('Success', 'Logged in successfully');
        navigation.replace('Main');
      } else {
        Alert.alert('Login Failed', result.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.heading}>Login to your Account</Text>

      {/* Customer ID */}
      <View style={styles.inputWrapper}>
        <View style={styles.inputRow}>
          <Feather name="user" size={18} color="#999" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Customer ID"
            placeholderTextColor="#999"
            value={customerId}
            onChangeText={text => {
              setCustomerId(text);
              setErrors({ ...errors, customerId: '' });
            }}
          />
        </View>
        {errors.customerId && <Text style={styles.errorText}>{errors.customerId}</Text>}
      </View>

      {/* Email */}
      <View style={styles.inputWrapper}>
        <View style={styles.inputRow}>
          <Feather name="mail" size={18} color="#999" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#999"
            value={email}
            onChangeText={text => {
              setEmail(text);
              setErrors({ ...errors, email: '' });
            }}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
      </View>

      {/* Password */}
      <View style={styles.inputWrapper}>
        <View style={styles.inputRow}>
          <Feather name="lock" size={18} color="#999" style={styles.icon} />
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Password"
            placeholderTextColor="#999"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={text => {
              setPassword(text);
              setErrors({ ...errors, password: '' });
            }}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Feather name={showPassword ? 'eye-off' : 'eye'} size={18} color="#999" />
          </TouchableOpacity>
        </View>
        {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
      </View>

      {/* Remember Me */}
      <TouchableOpacity
        style={styles.rememberRow}
        onPress={() => setRememberMe(!rememberMe)}
        activeOpacity={0.8}
      >
        <Feather
          name={rememberMe ? 'check-square' : 'square'}
          size={18}
          color="#2B2162"
        />
        <Text style={styles.rememberText}>Remember me</Text>
      </TouchableOpacity>

      {/* Sign In */}
      <TouchableOpacity style={styles.signInButton} onPress={handleSignIn} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.signInText}>Sign in</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity activeOpacity={0.7}>
        <Text style={styles.forgotText}>Forgot the password?</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  logo: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginBottom: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    color: '#212121',
    fontFamily: 'Urbanist-Bold',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 35.2,
  },
  inputWrapper: {
    marginBottom: 16,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 15,
    fontFamily: 'Urbanist-Regular',
    color: '#000',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    fontFamily: 'Urbanist-Regular',
    marginTop: 4,
    marginLeft: 4,
  },
  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 24,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  rememberText: {
    fontSize: 14,
    fontFamily: 'Urbanist-SemiBold',
    color: '#212121',
    lineHeight: 19.6,
    letterSpacing: 0.2,
  },
  signInButton: {
    height: 55,
    backgroundColor: '#2B2162',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  signInText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Urbanist-Bold',
  },
  forgotText: {
    fontSize: 16,
    fontFamily: 'Urbanist-SemiBold',
    color: '#2B2162',
    textAlign: 'center',
    letterSpacing: 0.2,
    lineHeight: 22.4,
  },
});

