import {Container, Typography, Unstable_Grid2 as Grid} from "@mui/material";
import {useParams} from "react-router-dom";
import {useSearchWorkoutQuery} from '../../store/apis/workout';
import Box from "@mui/material/Box";

export default function Workout() {
    const { type, muscle, difficulty } = useParams();
    const { data: workout, isLoading } = useSearchWorkoutQuery({ type, muscle, difficulty });
    console.log(workout);
    return (
        <Container maxWidth="md" sx={{
            paddingY: 2
        }}>
            {
                isLoading ?
                    <Typography variant="body1" align="center">
                        Loading workout...
                    </Typography>
                    : (
                        <Grid container marginTop={3} spacing={20} justifyContent="space-around">
                            {workout.map((work) => (

                                    <Box sx={{
                                        height:"15vh",
                                        width:"9em",
                                        boxShadow: "inset -5px -5px 9px rgba(255,255,255,0.45), inset 5px 5px 9px rgba(94,104,121,0.3);",
                                        background: "#dde1e7",
                                        borderRadius: "20px",
                                    }}>
                                        <Typography variant="body1" sx={{
                                            fontWeight: "700",
                                            letterSpacing:"1px",
                                            padding: '15px',
                                        }}>
                                            {work.name}
                                        </Typography>
                                        <Box alignItem="center" sx={{
                                            marginLeft: "0.2em",
                                            height:"4vh",
                                            width:"3.5em",
                                            borderRadius: "20px",
                                            boxShadow: "inset -5px -5px 9px rgba(255,255,255,0.45), inset 5px 5px 9px rgba(94,104,121,0.3);",
                                            background: (() => {
                                                switch (work.difficulty) {
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
                                                alignText:"center",
                                                fontWeight: "700",
                                                fontSize: "11px",
                                                letterSpacing:"1px",
                                                paddingLeft:"15px",
                                            }}>
                                                {work.difficulty}
                                            </Typography>
                                        </Box>

                                    </Box>

                            ))}
                        </Grid>
                    )
            }
        </Container>
    );
}
