import React, { useState, useEffect, useRef } from 'react';
import './App.css'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

function App() {

  const [wags, setWags] = useState(0);
  const initialDelay = 2000;
  const [percentage, setPercentage] = useState(0);
  const [upgradeCost, setUpgradeCost] = useState(3.738);
  const coefficient = 1.07;
  const revenueRef = useRef(1);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setPercentage((oldPercentage) => {
        const newPercentage = oldPercentage + (initialDelay / 100000);
        if (newPercentage > 1) {
          console.log(revenueRef.current); // Access the current value
          setWags((old) => old + revenueRef.current);
        }
        return newPercentage <= 1 ? newPercentage : 0;
      });
    }, initialDelay / 100);
    return () => clearInterval(intervalId);

  }, [initialDelay]);

  function upgradeDog() {
    if (wags >= upgradeCost) {
      setUpgradeCost(old => old * coefficient);
      revenueRef.current = revenueRef.current * coefficient; // Update the mutable object
     
      setWags(old => old - upgradeCost)
    }
    else {
      alert("Not enough waggle daggles.")
    }
  }
  function walkDog() {
    if (wags >= 10000) {
      alert("Hooray a walk! Walk walk walk walk walk. Walk. Walk walk walk walk.")
    }
    else {
      alert("Not enough waggle daggles.")
    }
  }
  return (
    <main>
      <img src={require('./img/dog.png')} alt="Cartoon dog" />
      <p>Wags: {wags.toFixed(2)}</p>
      <p>WPS: {revenueRef.current.toFixed(2)}</p>
      <Slider
        min={0}
        max={100}
        value={percentage * 100}
        railStyle={{ backgroundColor: '#ddd' }}
        trackStyle={{ backgroundColor: '#111' }}
        handleStyle={{ display: 'none' }} // Hide the knob
      />
      <div className="slider-buttons">
        <button onClick={() => upgradeDog()}>Upgrade: {upgradeCost.toFixed(2)}</button>
        <button onClick={() => walkDog()}>Walk dog: {10000}</button>

      </div>
    </main>
  );
}

export default App;
