import React from 'react';
import {StatusBar} from 'react-native';
import Navigation from './components/Navigation';
import { AuthProvider } from './utils/Auth';

const App = () => {
  return (
    <AuthProvider>
      <StatusBar backgroundColor="rgb(73, 73, 223)" />
      <Navigation />
    </AuthProvider>
  )
} 


export default App;