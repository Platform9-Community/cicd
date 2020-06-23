import React from 'react';
import logo from './k8logo.png';
import './App.css';
import packageJson from '../package.json';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Howdie everyone
        </p>
        <a
          className="App-link"
          href="https://platform9.com/signup"
          target="_blank"
          rel="noopener noreferrer"
        >
          Activate Your Platform9 Managed Kubernetes Free Tier
        </a>      
      </header>
      <p>
          The current version of this app is: {packageJson.version}
      </p>
    </div>
  );
}
console.log(packageJson.version);
export default App;
