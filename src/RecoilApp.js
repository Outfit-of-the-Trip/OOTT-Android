import React from 'react';
import { RecoilRoot } from "recoil";
import App from './App';

const RecoilApp = () => {

  return (
    <RecoilRoot>
        <App />
    </RecoilRoot>
  );
};

export default RecoilApp;
