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
        <Container maxWidth="md" sx={{
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
                { searchResults ? (
                <List>
                    {searchResults.map(result => (
                        <ListItem key={result.id} button onClick={() => handleClickGym(result)}>
                            <ListItemText primary={result.name} />
                        </ListItem>
                    ))}
                </List> 
                ) : (
                    <Typography> Unable to retreive gyms</Typography>
                )}
                { selectedGym ? (
                    <Typography>{selectedGym.name}, {selectedGym.addressPostalCode}</Typography>
                ) : (
                    <Typography>:(</Typography>
                )}
            </Stack>
        </Container>
    )
}



export default Gyms;