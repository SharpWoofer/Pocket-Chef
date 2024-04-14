import React, {useState} from 'react';
import './CalculatorPage.css';
import {Box, Grid, Stack, Typography} from "@mui/material";

const CalculatorPage = () => {
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [bmi, setBmi] = useState({ value: null, category: '' });
    const [value, setValue] = useState('');
    const [fromUnit, setFromUnit] = useState('grams');
    const [toUnit, setToUnit] = useState('grams');
    const [convertedValue, setConvertedValue] = useState(null);
    
    const conversionRates = {
        grams: 1,
        ounces: 28.3495,
        tablespoons: 14.3,
        pounds: 453.592,
        kilograms: 1000,
        teaspoons: 5.69,
        cups: 150,
        milliliters: 1,
        liters: 1000,
        fluidOunces: 28.3495,
    };
    const calculateBMI = () => {
        if (weight > 0 && height > 0) {
            const heightInMeters = height / 100;
            const bmiValue = weight / (heightInMeters ** 2);
            const bmiCategory = getBmiCategory(bmiValue);
    
            setBmi({ value: bmiValue.toFixed(2), category: bmiCategory });
        } else {
            setBmi(null);
            alert("Please enter valid weight and height values.");
        }
    };
    
    const convertMeasurement = () => {
        const fromRate = conversionRates[fromUnit];
        const toRate = conversionRates[toUnit];
        if (value < 0)
            return alert("Please enter a valid value to convert.");
        else{
        if (fromRate && toRate) {
            const result = (value * fromRate) / toRate;
            setConvertedValue(result.toFixed(2));
        } else {
            setConvertedValue('Conversion rate not found');
        }
    }
    };
    const getBmiCategory = (bmi) => {
        if (bmi < 18.5) return 'Underweight, please consult a doctor for advice.';
        if (bmi >= 18.5 && bmi < 25) return 'Normal (healthy weight), keep up the good work!';
        if (bmi >= 25 && bmi < 30) return 'Overweight, please consult a doctor for advice.';
        if (bmi >= 30 ) return 'Obese, please consult a doctor for advice.';
    };
    


    return (
        <Stack direction="row" sx={{
            display: "flex",
            justifyContent: "space-around",
            height: "100vh",
            padding:"2em"
        }}>
            <Grid sx={{
                width: "55%",
            }}>
                <Box
                    sx={{
                        borderBottom: 2,
                        borderColor: '#12365F',
                        height: "40vh",
                        width: "100%",
                    }}>
                    <Typography
                        variant="h1" // Changed from 'header1' to 'h1' for correct variant usage
                        sx={{
                            color: '#12365F',
                            textAlign: 'start',
                            fontSize: "9vh",
                            paddingLeft: "0.2em",
                            fontWeight: "bolder",
                            letterSpacing: "2px",
                            paddingBottom: "0.25em", // Adjust this value as needed for proper underline spacing
                        }}>
                        Calculate Your Measurements
                    </Typography>

                    <Typography style={{
                        color: '#1236F',
                        textAlign: 'start',
                        fontSize: "1.8vh",
                        paddingLeft: "0.2em",
                        letterSpacing: "2px",
                        marginLeft: "1em",
                        marginTop: "1em",
                        marginBottom: "2em"
                    }}>
                        Embark on a seamless journey of health and precision with our all-in-one measurement converter
                        and BMI calculator! Whether you're fine-tuning your recipes by converting pounds to kilograms or
                        teaspoons, or keeping a vigilant eye on your well-being by tracking your BMI, our intuitive
                        tools are designed to empower your lifestyle choices. Embrace accuracy and wellness, all with
                        just a few clicks - it's never been easier to stay on top of your health and culinary game!
                    </Typography>
                </Box>
                <Box style={{display: "flex", justifyContent: "space-around"}}>
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
                        {bmi.value && (
                            <div className="result-container">
                                <h2>Your BMI is: {bmi.value}</h2>
                                <p>You are currently: {bmi.category}</p>
                            </div>
                        )}
                    </div>
                    <div className="calculator-container">
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
                                <select id="fromUnit" value={fromUnit} onChange={(e) => setFromUnit(e.target.value)}
                                        className="input">
                                    <option value="grams">Grams</option>
                                    <option value="ounces">Ounces</option>
                                    <option value="tablespoons">Tablespoons</option>
                                    <option value="pounds">Pounds</option>
                                    <option value="kilograms">Kilograms</option>
                                    <option value="teaspoons">Teaspoons</option>
                                    <option value="cups">Cups</option>
                                    <option value="milliliters">Milliliters</option>
                                    <option value="liters">Liters</option>
                                    <option value="fluidOunces">Fluid Ounces</option>
                                    {/* Add more options as needed here*/}
                                </select>
                            </div>
                            <div className="input-container">
                                <label htmlFor="toUnit">To:</label>
                                <select id="toUnit" value={toUnit} onChange={(e) => setToUnit(e.target.value)}
                                        className="input">
                                    <option value="grams">Grams</option>
                                    <option value="ounces">Ounces</option>
                                    <option value="tablespoons">Tablespoons</option>
                                    <option value="pounds">Pounds</option>
                                    <option value="kilograms">Kilograms</option>
                                    <option value="teaspoons">Teaspoons</option>
                                    <option value="cups">Cups</option>
                                    <option value="milliliters">Milliliters</option>
                                    <option value="liters">Liters</option>
                                    <option value="fluidOunces">Fluid Ounces</option>
                                    {/* Add more options as needed here*/}
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
                </Box>
            </Grid>
            <Grid sx={{
                width: "40%",
            }} style={{display: "flex", justifyContent: "end"}}>
                <img src="./barista.png" alt="eating" style={{
                    width: "100%",
                    height: "80%",
                }}/>
            </Grid>
        </Stack>
        // <div className="calculator-container">
        //   <h1>BMI Calculator</h1>
        //   <div className="input-container">
        //     <label htmlFor="weight">Weight (kg):</label>
        //     <input
        //     type="number"
        //     id="weight"
        //     className="input"
        //     value={weight}
        //     onChange={(e) => setWeight(e.target.value)} // handle weight input change
        //   />
        //
        //   </div>
        //   <div className="input-container">
        //     <label htmlFor="height">Height (cm):</label>
        //     <input
        //     type="number"
        //     id="height"
        //     className="input"
        //     value={height}
        //     onChange={(e) => setHeight(e.target.value)} // handle height input change
        //   />
        //   </div>
        //   <button className="button" onClick={calculateBMI}>Calculate BMI</button>
        //   {bmi && (
        //     <div className="result-container">
        //       <h2>Your BMI is: {bmi}</h2>
        //     </div>
        //   )}
        //   <div className="measurement-converter-container">
        //   <h1>Measurement Converter</h1>
        //   <div className="input-container">
        //     <label htmlFor="value">Value:</label>
        //     <input
        //       type="number"
        //       id="value"
        //       value={value}
        //       onChange={(e) => setValue(e.target.value)}
        //       className="input"
        //     />
        //   </div>
        //   <div className="input-container">
        //     <label htmlFor="fromUnit">From:</label>
        //     <select id="fromUnit" value={fromUnit} onChange={(e) => setFromUnit(e.target.value)} className="input">
        //       <option value="grams">Grams</option>
        //       <option value="ounces">Ounces</option>
        //       <option value="tablespoons">Tablespoons</option>
        //       {/* Add more options as needed here*/}
        //     </select>
        //   </div>
        //   <div className="input-container">
        //     <label htmlFor="toUnit">To:</label>
        //     <select id="toUnit" value={toUnit} onChange={(e) => setToUnit(e.target.value)} className="input">
        //       <option value="grams">Grams</option>
        //       <option value="ounces">Ounces</option>
        //       <option value="tablespoons">Tablespoons</option>
        //       {/* Add more options as needed here*/}
        //     </select>
        //   </div>
        //   <button className="button" onClick={convertMeasurement}>Convert</button>
        //   {convertedValue && (
        //     <div className="result-container">
        //       <h2>Converted Value: {convertedValue} {toUnit}</h2>
        //     </div>
        //   )}
        // </div>
        // </div>
    );
};

export default CalculatorPage;