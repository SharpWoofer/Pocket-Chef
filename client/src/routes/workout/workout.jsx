import { Container, FormControl, Stack, MenuItem, InputLabel, Select, Typography, Unstable_Grid2 as Grid, TextField } from "@mui/material";
import { useSearchWorkoutQuery } from '../../store/apis/workout';
import Box from "@mui/material/Box";
import { useDebounce } from "@uidotdev/usehooks"
import React, { useEffect, useState } from "react";

export default function Workout() {
    const [name, setName] = useState("");
    const [type, setType] = useState('');
    const [muscle, setMuscle] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const debouncedName = useDebounce(name, 1000);

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
                <FormControl sx={{ m: 1, width: 150 }} >
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

                <FormControl sx={{ m: 1, width: 150 }}>
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

                <FormControl sx={{ m: 1, width: 200 }} >
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
                            <Box marginTop={3} spacing={20} justifyContent="space-around">
                                {workout.map(({ name, type, muscle, difficulty }) => (

                                    <Box key={name} sx={{
                                        height: "15vh",
                                        width: "9em",
                                        boxShadow: "inset -5px -5px 9px rgba(255,255,255,0.45), inset 5px 5px 9px rgba(94,104,121,0.3);",
                                        background: "#dde1e7",
                                        borderRadius: "20px",
                                    }}>
                                        <Typography variant="body1" sx={{
                                            fontWeight: "700",
                                            letterSpacing: "1px",
                                            padding: '15px',
                                        }}>
                                            {name}
                                        </Typography>
                                        <Box sx={{
                                            marginLeft: "0.2em",
                                            height: "4vh",
                                            width: "3.5em",
                                            borderRadius: "20px",
                                            boxShadow: "inset -5px -5px 9px rgba(255,255,255,0.45), inset 5px 5px 9px rgba(94,104,121,0.3);",
                                            background: (() => {
                                                switch (difficulty) {
                                                    case "beginner":
                                                        return "green";
                                                    case "intermediate":
                                                        return "yellow";
                                                    case "hard":
                                                        return "expert";
                                                    default:
                                                        return "red"; // Default background color
                                                }
                                            })()
                                        }}>

                                            <Typography variant="body1" sx={{
                                                paddingTop: "5px",
                                                alignText: "center",
                                                fontWeight: "700",
                                                fontSize: "11px",
                                                letterSpacing: "1px",
                                                paddingLeft: "15px",
                                            }}>
                                                {difficulty}
                                            </Typography>

                                        </Box>

                                    </Box>

                                ))}
                            </Box>
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
