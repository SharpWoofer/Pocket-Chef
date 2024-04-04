import { useState, useEffect } from "react";
import { Box, List, ListItem, ListItemText, InputAdornment, Stack, TextField, Typography, Button, InputLabel, Select, MenuItem, Container} from "@mui/material";
import { useSearchGymMutation } from "../../store/apis/gymLocator";
import { Search } from "@mui/icons-material";

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
        <Container maxWidth="sm" sx={{
            paddingY: 2
        }}>
            <Stack>
                <Box>
                    <Typography variant="body1" noWrap>Search for a gym</Typography>
                </Box>
                <form onSubmit={handleSubmitSearch}>
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
                        variant="standard"
                        fullWidth
                        onChange={(e) => handleChange(e.target.value)}
                    /><Button type="submit" variant="contained">Search</Button>
                </form>
                { selectedGym ? (
                    <Stack
                        direction='column'
                        spacing={2}
                        py={2}
                    >
                        <Typography>Gym name: { selectedGym.name }</Typography>
                        <Typography>Located in: { selectedGym.addressBuildingName }</Typography>
                        <Typography>Address: { selectedGym.addressStreetName }, { selectedGym.addressPostalCode }</Typography>
                        <Typography>Operating Hours:</Typography>
                        <Box>
                        {selectedGym.operatingHours.map((days, index) => (
                            <Box key={index}>
                                {days}
                            </Box>))}
                        </Box>
                        <Typography>Phone number: { selectedGym.phoneNumber }</Typography>
                        <Box>
                            <Typography> Coordinates: { selectedGym.coordinates[0] }, {selectedGym.coordinates[1] }</Typography>
                        </Box>
                    </Stack>
                ) : (
                    searchResults.length > 0 ? (
                        <List>
                            {searchResults.map(result => (
                                <ListItem key={result.id} button onClick={() => handleClickGym(result)}>
                                    <ListItemText primary={result.name} />
                                </ListItem>
                            ))}
                        </List> 
                        ) : (
                            <Typography> No gyms found </Typography>
                        )
                )}
            </Stack>
        </Container>
    )
}



export default Gyms;