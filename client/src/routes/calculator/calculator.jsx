import React, {useState} from 'react';
import './CalculatorPage.css';
import {Box, Grid, Stack, Typography} from "@mui/material";

const CalculatorPage = () => {
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [bmi, setBmi] = useState(null);
    const [value, setValue] = useState('');
    const [fromUnit, setFromUnit] = useState('grams');
    const [toUnit, setToUnit] = useState('grams');
    const [convertedValue, setConvertedValue] = useState(null);
    const conversionRates = {
        grams: 1,
        ounces: 28.3495,
        tablespoons: 14.3,
        // Add any other units you want to convert from/to grams
    };
    const calculateBMI = () => {
        if (weight > 0 && height > 0) {
            const heightInMeters = height / 100;
            const bmi = weight / (heightInMeters ** 2);
            setBmi(bmi.toFixed(2));
        } else {
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
        <Stack direction="row" sx={{
            display: "flex",
            justifyContent: "space-around",
            height: "100vh"
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
                        {bmi && (
                            <div className="result-container">
                                <h2>Your BMI is: {bmi}</h2>
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