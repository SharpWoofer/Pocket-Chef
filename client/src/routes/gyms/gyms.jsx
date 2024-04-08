import React, {useState} from "react";
import {
    Box,
    Button,
    Grid,
    InputAdornment,
    List,
    ListItem,
    ListItemText,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import {useSearchGymMutation} from "../../store/apis/gymLocator";
import {Search} from "@mui/icons-material";
import GoogleMapReact from 'google-map-react';


function Gyms() {

    const [query, setQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [searchGym] = useSearchGymMutation();
    const [selectedGym, setSelectedGym] = useState("");
    const handleChange = (query) => {
        setQuery(query);
    }
    const handleClickGym = (gym) => {
        setSelectedGym(gym);
    }
    const handleSubmitSearch = async (event) => {
        event.preventDefault();
        setSelectedGym(null);
        try {
            const {data: results} = await searchGym({ query: query });
            setSearchResults(results);
            //console.log(results);
            // for debugging purposes
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    }
    return (
        <Stack>
            <Stack direction="row">
                <Grid sx={{width:"55%"}}>
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

                    <Typography style={{ color: '#1236F', textAlign: 'start', fontSize:"1.8vh", paddingLeft:"0.2em", letterSpacing:"2px", marginLeft:"1em", marginTop:"1em", marginBottom:"2em"}}>
                        Discover your perfect fitness space with ease! Our website is your ultimate gym locator, guiding you to your next workout haven. Whether you're seeking a local spot for a quick session or a fully equipped center for a rigorous routine, we connect you to a variety of gyms in your vicinity. Say goodbye to endless searches and hello to more time lifting, running, and achieving your fitness goals!
                    </Typography>
                    <Box component="form" onSubmit={handleSubmitSearch} sx={{ display: 'flex', gap: 2, mt:12, ml:4}}>
                        <TextField
                            type="search"
                            placeholder="Input name of town or name of gym..."
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search />
                                    </InputAdornment>
                                ),
                            }}
                            variant="outlined"
                            fullWidth
                            onChange={(e) => handleChange(e.target.value)}
                        />
                        <Button type="submit" variant="contained" color="primary">
                            Search
                        </Button>
                    </Box>
                    <Stack style={{width:"50em", marginLeft:40}}>
                        {searchResults.length > 0 ? (
                        <List sx={{ bgcolor: 'background.paper', overflow: 'auto', maxHeight: 300, borderRadius: 1, boxShadow: 1 }}>
                            {searchResults.map(result => (
                                <ListItem key={result.id} button onClick={() => handleClickGym(result)} sx={{ '&:hover': { bgcolor: 'action.hover' }}}>
                                    <ListItemText primary={result.name} />
                                </ListItem>
                            ))}
                        </List>
                        ) : (
                        <Typography variant="subtitle1">No gyms found</Typography>
                        )}
                    </Stack>
                </Grid>
                <Grid sx={{width:"40%"}}>
                    <img src="./work-out.png" alt="eating" style={{
                        width: "100%",
                        height: "95%",
                    }} />
                </Grid>
            </Stack>
            <Stack spacing={3}>
                {selectedGym ? (
                    <Stack style={{ position: 'relative', height: '30vh' }}>
                        <img src="./gym1.png" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Gym banner" />
                        <Box
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                backgroundColor: 'rgba(0, 0, 0, 0.5)', // This gives the translucent effect
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Typography variant="header1" style={{ color: '#fff', textAlign: 'start', fontSize:"9vh", paddingLeft:"0.2em", fontWeight:"bolder", letterSpacing:"2px" }}>
                                {selectedGym.name}
                            </Typography>
                        </Box>
                        <Stack direction="row" >
                            <Box sx={{ height: "55vh", width: '60%', mt: 2 , border:1, borderColor:"divider", borderRadius:2}}>
                                <GoogleMapReact
                                    bootstrapURLKeys={{key: "AIzaSyCK1FFoRojFpDYrLA28EWLZLbYmvnGs7ok"}}
                                    defaultCenter={{lat: selectedGym.coordinates[0], lng: selectedGym.coordinates[1]}}
                                    defaultZoom={15}
                                >
                                    <div style={{
                                        color: 'white',
                                        background: 'red',
                                        padding: '10px',
                                        display: 'inline-flex',
                                        textAlign: 'center',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: '100%',
                                        transform: 'translate(-50%, -50%)'
                                    }}>
                                    </div>
                                </GoogleMapReact>
                            </Box>
                            <Box
                                sx={{
                                    mt:2,
                                    width:"40%",
                                    ml: "2em",  // This is the same as marginLeft but using the shorthand property
                                    border: 1,
                                    borderColor: 'divider',
                                    borderRadius: 2,
                                    p: 2,
                                    bgcolor: 'background.paper',
                                    boxShadow: 1,
                                    '&:hover': {
                                        boxShadow: 3,
                                    },
                                }}
                            >
                                <Typography variant="body1" color="primary" sx={{ mb: 1, fontWeight: 'bold', fontSize: '1.1rem' }}>
                                    Located in:
                                </Typography>
                                <Typography variant="body1" color="text.primary" sx={{ mb: 1, fontSize: '1.1rem' }}>
                                    {selectedGym.addressBuildingName}
                                </Typography>

                                <Typography variant="body1" color="primary" sx={{ mb: 1, fontWeight: 'bold', fontSize: '1.1rem' }}>
                                    Address:
                                </Typography>
                                <Typography variant="body1" color="text.primary" sx={{ mb: 1, fontSize: '1.1rem' }}>
                                    {selectedGym.addressStreetName}, {selectedGym.addressPostalCode}
                                </Typography>

                                <Typography variant="body1" color="primary" sx={{ mb: 1, fontWeight: 'bold', fontSize: '1.1rem' }}>
                                    Operating Hours:
                                </Typography>
                                <Box sx={{ pl: 2, mb: 1 }}>
                                    {selectedGym.operatingHours.map((day, index) => (
                                        <Typography key={index} variant="body2" color="text.primary" sx={{ mb: 0.5, fontSize: '1.05rem' }}>
                                            {day}
                                        </Typography>
                                    ))}
                                </Box>

                                <Typography variant="body1" color="primary" sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                                    Phone number:
                                </Typography>
                                <Typography variant="body1" color="text.primary" sx={{ fontSize: '1.1rem' }}>
                                    {selectedGym.phoneNumber}
                                </Typography>
                            </Box>


                        </Stack>

                    </Stack>) : (
                        <Box></Box>

                )}
            </Stack>
        </Stack>

    )
}



export default Gyms;