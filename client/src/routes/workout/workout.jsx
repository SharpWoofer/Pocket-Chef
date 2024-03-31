import { Container, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useSearchWorkoutQuery } from '../../store/apis/workout';

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
                        <div>
                            <Typography variant="h4" align="center" gutterBottom>
                                {workout[0].name}
                            </Typography>
                            <Typography variant="body1" align="center" gutterBottom>
                                {workout[0].type}
                            </Typography>
                            <Typography variant="body1" align="center" gutterBottom>
                                {workout[0].muscle}
                            </Typography>
                        </div >
                    )
            }
        </Container>
    );
}
