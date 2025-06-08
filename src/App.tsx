import React from 'react';
import './App.css';
import { LogicGamePage } from './components/pages/LogicGamePage.tsx';
import { SenseGamePage } from './components/pages/SenseGamePage.tsx';

function App() {
  return (
    <>
      <div>学マス</div>
      <LogicGamePage />
      {/* <SenseGamePage /> */}
    </>
  );
}

export default App;
