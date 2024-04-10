import { Container, Collapse, FormControl, Stack, MenuItem, InputLabel, Select, Typography, Grid, TextField } from "@mui/material";
import { useSearchWorkoutQuery } from '../../store/apis/workout';
import Box from "@mui/material/Box";
import { useDebounce } from "@uidotdev/usehooks"
import React, { useState } from "react";
import IconButton from '@mui/material/IconButton';

export default function Workout() {
    const [name, setName] = useState("");
    const [type, setType] = useState('');
    const [muscle, setMuscle] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const debouncedName = useDebounce(name, 1000);
    const [showInstructions, setShowInstructions] = useState(null);
    const instructionsTextSize = '1.25rem';

    const { data: workout, isLoading } = useSearchWorkoutQuery({
        name: debouncedName,
        type: type,
        muscle: muscle,
        difficulty: difficulty,
    });

    const exerciseType = [
        'Cardio',
        'Plyometrics',
        'Powerlifting',
        'Strength',
        'Stretching',
        'Strongman',
    ];

    const muscleGroup = [
        'Abdominals',
        'Abductors',
        'Adductors',
        'Biceps',
        'Calves',
        'Chest',
        'Forearms',
        'Glutes',
        'Hamstrings',
        'Lats',
        'Lower_back',
        'Middle_back',
        'Neck',
        'Quadriceps',
        'Traps',
        'Triceps'
    ];

    const exerciseDifficulty = [
        'Beginner',
        'Intermediate',
        'Expert',
    ];

    return (

        <Container maxWidth="lg" sx={{
            paddingY: 2
        }}>
            <Stack direction="row" spacing={2} justifyContent={"center"}>
                <TextField
                    label="Search by name"
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    sx={{ flexGrow: 1, marginBottom: 2 }} // Add some margin at the bottom
                />
                <FormControl sx={{ width: 150 }} >
                    <InputLabel id="exercise-type-label">Exercise Type</InputLabel>
                    <Select
                        labelId="exercise-type-label"
                        id="exercise-type"
                        value={type}
                        onChange={(event) => setType(event.target.value)}
                        label="Exercise Type"
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {exerciseType.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl sx={{ width: 150 }}>
                    <InputLabel id="muscle-group-label">Muscle Group</InputLabel>
                    <Select
                        labelId="muscle-group-label"
                        id="muscle-group"
                        value={muscle}
                        onChange={(event) => setMuscle(event.target.value)}
                        autoWidth
                        label="Muscle Group"
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {muscleGroup.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl sx={{ width: 200 }} >
                    <InputLabel id="exercise-difficulty-label">Exercise Difficulty</InputLabel>
                    <Select
                        labelId="exercise-difficulty-label"
                        id="exercise-difficulty"
                        value={difficulty}
                        onChange={(event) => setDifficulty(event.target.value)}
                        autoWidth
                        label="Exercise Difficulty"
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {exerciseDifficulty.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Stack>
            {
                isLoading ? (
                    <Typography variant="body1" align="center">
                        Loading workout...
                    </Typography>
                ) :
                    workout.length ?
                        (
                            <Grid container spacing={2}>
                                {workout.map(({ name, muscle, difficulty, instructions }, index) => (
                                    <Grid item xs={12} key={index}>
                                        <Box marginTop={2} sx={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignContent: "flex-start",
                                        }}>
                                            <IconButton
                                                onClick={() => setShowInstructions(showInstructions === index ? null : index)} sx={{
                                                    width: "22.5%",
                                                    borderRadius: "10px",
                                                    background: (() => {
                                                        switch (difficulty) {
                                                            case "beginner":
                                                                return "#00c04b";
                                                            case "intermediate":
                                                                return "#ffa500";
                                                            case "expert":
                                                                return "#cf3229";
                                                            default:
                                                                return "white";
                                                        }
                                                    })(),
                                                }}
                                            >
                                                <Typography variant="body1" sx={{
                                                    fontSize: "1.5rem",
                                                    fontWeight: "700",
                                                    letterSpacing: "0.75px",
                                                    padding: '0.5rem',
                                                    color: "black",
                                                }}>
                                                    {name}
                                                </Typography>
                                            </IconButton>

                                            <Collapse in={showInstructions === index}>
                                                <Container sx={{
                                                    fontSize: "2rem",
                                                }}>
                                                    <Typography component="div" sx={{ fontSize: instructionsTextSize }}>
                                                        Muscle: {muscle.toUpperCase()}
                                                        <Typography component="div" sx={{ fontSize: instructionsTextSize }}>
                                                            Mode: {difficulty.toUpperCase()}
                                                            <Typography component="div" sx={{ fontSize: instructionsTextSize }}>
                                                                Instructions: {instructions}
                                                            </Typography>
                                                        </Typography>
                                                    </Typography>
                                                </Container>
                                            </Collapse>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                        )
                        : <Box width={1}>
                            <Typography variant="h6" align="center">
                                No exercises found :(
                            </Typography>
                        </Box>
            }
        </Container >
    );
}
