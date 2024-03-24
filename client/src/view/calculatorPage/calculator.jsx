import React, { useState } from 'react';
import './CalculatorPage.css'; 

const CalculatorPage = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(null);
  // States for Measurement Converter
  const [value, setValue] = useState('');
  const [fromUnit, setFromUnit] = useState('grams');
  const [toUnit, setToUnit] = useState('grams');
  const [convertedValue, setConvertedValue] = useState(null);
  const conversionRates = {
    grams: 1,
    ounces: 28.3495,
    tablespoons: 14.3, // this is an approximation and can vary based on the substance
    // Add any other units you want to convert from/to grams
  };
  const calculateBMI = () => {
    if (weight > 0 && height > 0) {
      // Convert height from centimeters to meters before calculation
      const heightInMeters = height / 100;
      const bmi = weight / (heightInMeters ** 2);
      // Set the BMI state, rounded to two decimal places
      setBmi(bmi.toFixed(2));
    } else {
      // Set BMI to null or some error state if weight or height are not valid
      setBmi(null);
      alert("Please enter valid weight and height values.");
    }
  };
  const convertMeasurement = () => {
    const fromRate = conversionRates[fromUnit];
    const toRate = conversionRates[toUnit];

    if (fromRate && toRate) {
      const result = (value * fromRate) / toRate;
      setConvertedValue(result.toFixed(2));
    } else {
      setConvertedValue('Conversion rate not found');
    }
  };
  

  return (
    <div className="calculator-container">
      <h1>BMI Calculator</h1>
      <div className="input-container">
        <label htmlFor="weight">Weight (kg):</label>
        <input
        type="number"
        id="weight"
        className="input"
        value={weight}
        onChange={(e) => setWeight(e.target.value)} // handle weight input change
      />

      </div>
      <div className="input-container">
        <label htmlFor="height">Height (cm):</label>
        <input
        type="number"
        id="height"
        className="input"
        value={height}
        onChange={(e) => setHeight(e.target.value)} // handle height input change
      />
      </div>
      <button className="button" onClick={calculateBMI}>Calculate BMI</button>
      {/* Result display */}
      {bmi && (
        <div className="result-container">
          <h2>Your BMI is: {bmi}</h2>
        </div>
      )}
      <div className="measurement-converter-container">
      <h1>Measurement Converter</h1>
      <div className="input-container">
        <label htmlFor="value">Value:</label>
        <input
          type="number"
          id="value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="input"
        />
      </div>
      <div className="input-container">
        <label htmlFor="fromUnit">From:</label>
        <select id="fromUnit" value={fromUnit} onChange={(e) => setFromUnit(e.target.value)} className="input">
          <option value="grams">Grams</option>
          <option value="ounces">Ounces</option>
          <option value="tablespoons">Tablespoons</option>
          {/* Add more options as needed */}
        </select>
      </div>
      <div className="input-container">
        <label htmlFor="toUnit">To:</label>
        <select id="toUnit" value={toUnit} onChange={(e) => setToUnit(e.target.value)} className="input">
          <option value="grams">Grams</option>
          <option value="ounces">Ounces</option>
          <option value="tablespoons">Tablespoons</option>
          {/* Add more options as needed */}
        </select>
      </div>
      <button className="button" onClick={convertMeasurement}>Convert</button>
      {convertedValue && (
        <div className="result-container">
          <h2>Converted Value: {convertedValue} {toUnit}</h2>
        </div>
      )}
    </div>
    </div>
  );
};

export default CalculatorPage;