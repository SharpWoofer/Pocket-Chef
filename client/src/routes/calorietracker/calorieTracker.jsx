import { useState, useEffect } from "react";
import { Box, List, ListItem, ListItemText, InputAdornment, Stack, TextField, Typography, Button, InputLabel, Select, MenuItem, Grid, Paper, FormControl } from "@mui/material";
import { Search } from "@mui/icons-material";
import { useSearchIngredientMutation, useGetIngredientByIdMutation, useGetCalCountMutation, useCreateCalCountMutation, useUpdateCalCountMutation } from '../../store/apis/ingredient';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { useSelector } from 'react-redux';

function CalorieTracker() {
    const [query, setQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [amount, setAmount] = useState(0);
    const [calCount, setCalCount] = useState(0);
    const [calData, setCalData] = useState(null);
    const [selectedIngredient, setSelectedIngredient] = useState(null);
    const [selectedDate, setSelectedDate] = useState(dayjs('2024-03-23'));
    const [selectedMeal, setSelectedMeal] = useState("");
    const username = useSelector(state => state.auth.user.username);

    const [searchIngredient] = useSearchIngredientMutation();
    const [getIngredientById] = useGetIngredientByIdMutation();
    const [getCalCount] = useGetCalCountMutation();
    const [createCalCount] = useCreateCalCountMutation();
    const [updateCalCount] = useUpdateCalCountMutation();

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
            const { data: results } = await searchIngredient({ query: query });
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
            const { data: cal } = await getIngredientById({
                id: selectedIngredient,
                number: amount
            });
            setCalCount(cal);
        } catch (error) {
            console.error('Error fetching calorie', error);
        }
    }

    const handleDateChange = async (newDate) => {
        setSelectedDate(newDate);
    };
    useEffect(() => {
        const fetchCalCount = async () => {
            try {
                const { data: temp } = await getCalCount({
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
                    const { data: updatedCal } = await updateCalCount({
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
                    const { data: updatedCal } = await updateCalCount({
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
                    const { data: updatedCal } = await updateCalCount({
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
                    const { data: updatedCal } = await createCalCount({
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
                    const { data: updatedCal } = await createCalCount({
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
                    const { data: updatedCal } = await createCalCount({
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
            <Grid container spacing={3}>
                <Grid item>
                    <Paper elevation={4}>
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
                </Grid>
                <Grid item>
                    <Paper elevation={4}>
                        <Stack direction="column">
                            <Box bgcolor="green" padding={1} sx={{ px: 1, borderRadius: 1 }}>
                                <Typography color="white" sx={{ fontWeight: 600, fontSize: '1.1rem', letterSpacing: '0.075rem' }}>CALORIE COUNT</Typography>
                            </Box>
                            <Box sx={{ px: 1, borderRadius: 1, }}>
                                {calData ? (
                                    <Stack direction="column">
                                        <Typography paddingY={.25}>Breakfast Calories: {calData.breakfastCal} </Typography>
                                        <Typography paddingY={.25}>Lunch Calories: {calData.lunchCal} </Typography>
                                        <Typography paddingY={.25}>Dinner Calories: {calData.dinnerCal} </Typography>
                                    </Stack>
                                ) : (
                                    <Box sx={{ py: 1 }}>
                                        <Stack direction="column">
                                            <Typography paddingY={.25}>Breakfast Calories: 0 </Typography>
                                            <Typography paddingY={.25}>Lunch Calories: 0 </Typography>
                                            <Typography paddingY={.25}>Dinner Calories: 0 </Typography>
                                        </Stack>
                                    </Box>
                                )}
                            </Box>
                            <Box bgcolor='green' padding={1} sx={{ px: 1, borderRadius: 1 }}>
                                <Typography color='white' sx={{ fontWeight: 600, fontSize: '1.1rem', letterSpacing: '0.075rem' }}> CALORIE TRACKER</Typography>
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
                                                        <Search />
                                                    </InputAdornment>
                                                ),
                                            }}
                                            variant="standard"
                                            fullWidth
                                            onChange={(e) => handleChange(e.target.value)}
                                        />
                                    </Box>
                                    <Box>
                                        <Button size="small" type="submit" variant="contained">Search</Button>
                                    </Box>
                                </Stack>
                            </form>

                            {selectedIngredient ? (
                                <Typography>Selected: {selectedIngredient}</Typography>
                            ) : (
                                searchResults ? (
                                    <List>
                                        {searchResults.map(result => (
                                            <ListItem key={result.id} button onClick={() => handleClickIngredient(result)}>
                                                <ListItemText primary={result.name} />
                                            </ListItem>
                                        ))}
                                    </List>
                                ) : (
                                    <Typography paddingX={1.5} paddingTop={1.5}>Unable to retrieve ingredients :(</Typography>
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
                                                        <Search />
                                                    </InputAdornment>
                                                ),
                                            }}
                                            variant="standard"
                                            fullWidth
                                            onChange={(e) => handleNum(e.target.value)}
                                        />
                                    </Box>
                                    <Box>
                                        <Button size="small" type="submit" variant="contained">Submit</Button>
                                    </Box>
                                </Stack>
                            </form>

                            <Typography padding={1}>Total calories: {calCount} </Typography>
                            <form onSubmit={handleAdd}>
                                <Stack direction="row" paddingY={1.5} paddingX={1.5}>
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
                                        <Button size="small" type="submit" variant="contained">Add</Button>
                                    </Box>
                                </Stack>
                            </form>
                        </Stack>
                    </Paper>
                </Grid>
            </Grid>
        </Stack >
    )
}

export default CalorieTracker;