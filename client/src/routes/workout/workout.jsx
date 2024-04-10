import { Container, Dialog, DialogTitle, DialogContent, FormControl, Stack, MenuItem, InputLabel, Select, Typography, Grid, TextField } from "@mui/material";
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
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
    const [openDialog, setOpenDialog] = useState(false);
    const [showInstructions, setShowInstructions] = useState(null);

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
                                {workout.map(({ name, type, muscle, difficulty, instructions }, index) => (
                                    <Grid item xs={12} sm={6} md={4} key={index}>
                                        <Box marginTop={2} sx={{
                                            height: "10rem",
                                            width: "15rem",
                                            boxShadow: "0 0 10px rgba(0, 0, 0, 0.15)",
                                            background: "#d3d3d3",
                                            borderRadius: "10px",
                                            position: 'relative',
                                        }}>
                                            <IconButton
                                                onClick={() => setShowInstructions(showInstructions === index ? null : index)}
                                                sx={{
                                                    position: 'absolute',
                                                    top: 0,
                                                    right: 0,
                                                }}
                                            >
                                                <FitnessCenterIcon />
                                            </IconButton>

                                            <Typography variant="body1" sx={{
                                                borderRadius: "5px",
                                                fontWeight: "700",
                                                letterSpacing: "1px",
                                                padding: '0.5rem',
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
                                                })()
                                            }}>
                                                {name}
                                            </Typography>

                                            {showInstructions === index && (
                                                <Typography component="div">
                                                    Muscle Group: {muscle.charAt(0).toUpperCase() + muscle.slice(1)}
                                                    <Typography component="div">
                                                        Difficulty: {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                                                        <Typography component="div">
                                                            {instructions}
                                                        </Typography>
                                                    </Typography>
                                                </Typography>
                                            )}
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
