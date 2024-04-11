import React, {useEffect, useState} from 'react';
import {
    Box,
    Button,
    FormControl,
    Grid,
    InputAdornment,
    InputLabel,
    List,
    ListItem,
    ListItemText,
    MenuItem,
    Paper,
    Select,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import {Search} from "@mui/icons-material";
import {
    useCreateCalCountMutation,
    useGetCalCountMutation,
    useGetIngredientByIdMutation,
    useSearchIngredientMutation,
    useUpdateCalCountMutation
} from '../../store/apis/ingredient';
import dayjs from 'dayjs';
import {DemoContainer} from '@mui/x-date-pickers/internals/demo';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {StaticDatePicker} from '@mui/x-date-pickers/StaticDatePicker';
import {useSelector} from 'react-redux';
import CalorieGraph from "./calorieGraph.jsx";

function CalorieTracker() {
    const [query, setQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [amount, setAmount] = useState(0);
    const [calCount, setCalCount] = useState(0);
    const [calData, setCalData] = useState(null);
    const [selectedIngredient, setSelectedIngredient] = useState(null);
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [selectedMeal, setSelectedMeal] = useState("");
    const username = useSelector(state => state.auth.user.username);

    const [searchIngredient] = useSearchIngredientMutation();
    const [getIngredientById] = useGetIngredientByIdMutation();
    const [getCalCount] = useGetCalCountMutation();
    const [createCalCount] = useCreateCalCountMutation();
    const [updateCalCount] = useUpdateCalCountMutation();
    const [currentDate, setCurrentDate] = useState(dayjs());
    const [currentMonthText, setCurrentMonthText] = useState(dayjs().format('MMMM YYYY'));

    const handleChange = (query) => {
        setQuery(query);
    }

    const handleNum = (num) => {
        setAmount(num);
    }

    const handleSubmitSearch = async (event) => {
        event.preventDefault();
        setSelectedIngredient(null);
        try {
            const {data: results} = await searchIngredient({query: query});
            setSearchResults(results);
            //console.log(results);
            // for debugging purposes
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    }

    const handleClickIngredient = (ingredient) => {
        setSelectedIngredient(ingredient.id);
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const {data: cal} = await getIngredientById({
                id: selectedIngredient,
                number: amount
            });
            setCalCount(cal);
        } catch (error) {
            console.error('Error fetching calorie', error);
        }
    }

    const handleDateChange = (newDate) => {
        setSelectedDate(newDate);
        setCurrentMonthText(newDate.format('MMMM YYYY')); // Update the month text when the date changes
    };
    useEffect(() => {
        const fetchCalCount = async () => {
            try {
                const {data: temp} = await getCalCount({
                    username: username,
                    date: selectedDate.format('YYYY-MM-DD')
                });
                setCalData(temp);
            } catch (error) {
                console.error('Error fetching calorie', error);
            }
        };
        fetchCalCount();
    }, [selectedDate]);

    const handleMealChange = (event) => {
        setSelectedMeal(event.target.value);
    };
    const handleAdd = async (event) => {
        event.preventDefault();
        if (calData) {
            if (selectedMeal === "breakfast") {
                try {
                    const {data: updatedCal} = await updateCalCount({
                        username: username,
                        date: selectedDate.format('YYYY-MM-DD'),
                        breakfastCal: calCount,
                        lunchCal: 0,
                        dinnerCal: 0
                    });
                    setCalData(updatedCal.calorieCount);
                } catch (error) {
                    console.error('Error updating breakfast calorie count:', error);
                }
            } else if (selectedMeal === "lunch") {
                try {
                    const {data: updatedCal} = await updateCalCount({
                        username: username,
                        date: selectedDate.format('YYYY-MM-DD'),
                        breakfastCal: 0,
                        lunchCal: calCount,
                        dinnerCal: 0
                    });
                    setCalData(updatedCal.calorieCount);
                } catch (error) {
                    console.error('Error updating lunch calorie count:', error);
                }
            } else if (selectedMeal === "dinner") {
                try {
                    const {data: updatedCal} = await updateCalCount({
                        username: username,
                        date: selectedDate.format('YYYY-MM-DD'),
                        breakfastCal: 0,
                        lunchCal: 0,
                        dinnerCal: calCount
                    });
                    setCalData(updatedCal.calorieCount);
                } catch (error) {
                    console.error('Error updating dinner calorie count:', error);
                }
            }
        } else {
            if (selectedMeal === "breakfast") {
                try {
                    const {data: updatedCal} = await createCalCount({
                        username: username,
                        date: selectedDate.format('YYYY-MM-DD'),
                        breakfastCal: calCount
                    });
                    setCalData(updatedCal.calorieCount);
                } catch (error) {
                    console.error('Error updating breakfast calorie count:', error);
                }
            } else if (selectedMeal === "lunch") {
                try {
                    const {data: updatedCal} = await createCalCount({
                        username: username,
                        date: selectedDate.format('YYYY-MM-DD'),
                        lunchCal: calCount
                    });
                    setCalData(updatedCal.calorieCount);
                } catch (error) {
                    console.error('Error updating lunch calorie count:', error);
                }
            } else if (selectedMeal === "dinner") {
                try {
                    const {data: updatedCal} = await createCalCount({
                        username: username,
                        date: selectedDate.format('YYYY-MM-DD'),
                        dinnerCal: calCount
                    });
                    setCalData(updatedCal.calorieCount);
                } catch (error) {
                    console.error('Error updating dinner calorie count:', error);
                }
            }
        }
        //console.log(updatedCal);// debugging
    }

    return (
        <Stack>
            <Stack direction="row" sx={{
                display: "flex",
                justifyContent: "space-around",
                padding: "2em",

            }}>
                <Grid
                    sx={{
                        width: "50%"
                    }}>
                    <Box
                        sx={{
                            borderBottom: 2,
                            borderColor: '#12365F',
                            height: "12vh",
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
                            Calories Tracking
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
                            Fuel your fitness journey with precision! Our calorie tracking tool is designed to be your
                            daily companion in managing your dietary goals. From the avid gym-goer to the
                            health-conscious foodie, effortlessly log every bite and monitor your caloric intake to
                            ensure you're on track for success. With our user-friendly interface, maintaining your
                            nutrition has never been more straightforward or more motivating. Track, adjust, and
                            conquer—your path to a healthier you starts here! </Typography>
                        <Paper elevation={4}>
                            <CalorieGraph/>
                        </Paper>
                        <Typography
                            variant="h6"
                            sx={{ mt: 2, textAlign: 'center' }}
                            >
                            {currentMonthText} {/* Displaying the month and year */}
                            </Typography>
                    </Box>
                </Grid>
                <Grid sx={{
                    width: "40%"
                }}>
                    <Stack>
                        <img src="./eating.png" alt="eating" style={{
                            width: "40%",
                            height: "100%",
                            objectFit: "cover",
                        }}/>
                    </Stack>
                    <Stack>
                        <Grid container spacing={4} style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                            <Stack sx={{ml: 2}}>

                                <Grid item style={{
                                    display: "flex",
                                }}>
                                    <Paper elevation={4} style={{
                                        marginRight: "2em"
                                    }}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DemoContainer
                                                components={[
                                                    'StaticDatePicker',
                                                ]}
                                            >
                                                <StaticDatePicker
                                                    value={selectedDate}
                                                    onChange={handleDateChange}
                                                    defaultValue={dayjs('2024-03-23')}
                                                />
                                            </DemoContainer>
                                        </LocalizationProvider>
                                    </Paper>

                                    <Paper elevation={4} sx={{
                                        width: "100%",
                                        padding: "1em",
                                        height: "120%"
                                    }}>
                                        <Stack direction="column">
                                            <Box bgcolor="green" padding={1} sx={{px: 1, borderRadius: 1}}>
                                                <Typography color="white" sx={{
                                                    fontWeight: 600,
                                                    fontSize: '1.1rem',
                                                    letterSpacing: '0.075rem'
                                                }}>CALORIE COUNT</Typography>
                                            </Box>
                                            <Box sx={{px: 1, borderRadius: 1,}}>
                                                {calData ? (
                                                    <Stack direction="column">
                                                        <Typography paddingY={.25}>Breakfast
                                                            Calories: {calData.breakfastCal} </Typography>
                                                        <Typography paddingY={.25}>Lunch
                                                            Calories: {calData.lunchCal} </Typography>
                                                        <Typography paddingY={.25}>Dinner
                                                            Calories: {calData.dinnerCal} </Typography>
                                                    </Stack>
                                                ) : (
                                                    <Box sx={{py: 1}}>
                                                        <Stack direction="column">
                                                            <Typography paddingY={.25}>Breakfast Calories:
                                                                0 </Typography>
                                                            <Typography paddingY={.25}>Lunch Calories: 0 </Typography>
                                                            <Typography paddingY={.25}>Dinner Calories: 0 </Typography>
                                                        </Stack>
                                                    </Box>
                                                )}
                                            </Box>
                                            <Box bgcolor='green' padding={1} sx={{px: 1, borderRadius: 1}}>
                                                <Typography color='white' sx={{
                                                    fontWeight: 600,
                                                    fontSize: '1.1rem',
                                                    letterSpacing: '0.075rem'
                                                }}> CALORIE TRACKER</Typography>
                                            </Box>

                                            <form onSubmit={handleSubmitSearch}>
                                                <Stack direction="row" paddingTop={1.5} paddingX={1.5}>
                                                    <Box paddingRight={2}>
                                                        <TextField
                                                            type="search"
                                                            placeholder="Search ingredients.."
                                                            InputProps={{
                                                                startAdornment: (
                                                                    <InputAdornment position="start">
                                                                        <Search/>
                                                                    </InputAdornment>
                                                                ),
                                                            }}
                                                            variant="standard"
                                                            fullWidth
                                                            onChange={(e) => handleChange(e.target.value)}
                                                        />
                                                    </Box>
                                                    <Box>
                                                        <Button size="small" type="submit"
                                                                variant="contained">Search</Button>
                                                    </Box>
                                                </Stack>
                                            </form>

                                            {selectedIngredient ? (
                                                <Typography>Selected: {selectedIngredient}</Typography>
                                            ) : (
                                                searchResults ? (
                                                    <List>
                                                        {searchResults.map(result => (
                                                            <ListItem key={result.id} button
                                                                      onClick={() => handleClickIngredient(result)}>
                                                                <ListItemText primary={result.name}/>
                                                            </ListItem>
                                                        ))}
                                                    </List>
                                                ) : (
                                                    <Typography paddingX={1.5} paddingTop={1.5}>Unable to retrieve
                                                        ingredients :(</Typography>
                                                )
                                            )}

                                            <form onSubmit={handleSubmit}>
                                                <Stack direction="row" paddingY={1.5} paddingX={1.5}>
                                                    <Box paddingRight={2}>
                                                        <TextField
                                                            type="search"
                                                            placeholder="Enter amount..."
                                                            InputProps={{
                                                                startAdornment: (
                                                                    <InputAdornment position="start">
                                                                        <Search/>
                                                                    </InputAdornment>
                                                                ),
                                                            }}
                                                            variant="standard"
                                                            fullWidth
                                                            onChange={(e) => handleNum(e.target.value)}
                                                        />
                                                    </Box>
                                                    <Box>
                                                        <Button size="small" type="submit"
                                                                variant="contained">Submit</Button>
                                                    </Box>
                                                </Stack>
                                            </form>

                                            <Typography padding={1}>Total calories: {calCount} </Typography>
                                            <form onSubmit={handleAdd}>
                                                <Stack direction="row" paddingBottom={1.5} paddingX={1.5}>
                                                    <Box flexGrow={1} paddingRight={2}>
                                                        <FormControl fullWidth>
                                                            <InputLabel size="small">Meal</InputLabel>
                                                            <Select
                                                                required
                                                                label="Meal"
                                                                name="meal"
                                                                size="small"
                                                                value={selectedMeal}
                                                                onChange={handleMealChange}
                                                            >
                                                                <MenuItem value="breakfast">Breakfast</MenuItem>
                                                                <MenuItem value="lunch">Lunch</MenuItem>
                                                                <MenuItem value="dinner">Dinner</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </Box>
                                                    <Box>
                                                        <Button size="small" type="submit"
                                                                variant="contained">Add</Button>
                                                    </Box>
                                                </Stack>
                                            </form>
                                        </Stack>
                                    </Paper>
                                </Grid>
                            </Stack>
                        </Grid>
                    </Stack>
                </Grid>
            </Stack>


        </Stack>
    )
}

export default CalorieTracker;