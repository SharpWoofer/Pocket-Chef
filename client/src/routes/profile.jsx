import { Avatar, Box, Button, FormControl, FormLabel, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material"
import { useSelector } from "react-redux"

const Profile = () => {
  const {user} = useSelector((state) => state.auth)
  
  const onSubmit = (event) => {
    event.preventDefault()
    const mForm = event.target.elements
    const mBody = user || {}
    for (const item of mForm) {
      if (item.name) {
        mBody[item.name] = item.value
      }
    }
    console.log(mBody)
  } 
  
  return (
    <Stack
      alignItems="center"
    >
      <Box
        width="60%"
        padding="10px"
      >
        <Typography
          sx={{ display: 'inline-block' }}
          borderBottom="1px solid #e0e0e0"
          marginBottom="50px"
        >
          User Profile
        </Typography>
        
        <form onSubmit={onSubmit}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            paddingBottom={5}
            borderBottom="1px solid #e0e0e0"
            marginBottom="50px"
          >
            <Stack direction="row" spacing="10px" alignItems="center">
              <Avatar sx={{ width: 100, height: 100 }} />
              <Stack>
                <Typography>{user.username}</Typography>
              </Stack>
            </Stack>
            <Stack direction="row" spacing={4}>
              <Button variant="contained">Upload New Photo</Button>
              <Button variant="contained" color="error">Delete</Button>
            </Stack>
          </Stack>

          <Stack
            paddingBottom={5}
            borderBottom="1px solid #e0e0e0"
            marginBottom="50px"
          >
            <Stack spacing={2}>
              <Stack
                direction="row"
                justifyContent="space-between"
                spacing={4}
              >
                <Stack flex="1">
                  <FormLabel>First Name</FormLabel>
                  <TextField defaultValue={user.firstName} size="small"></TextField>
                </Stack>
                <Stack flex="1">
                  <FormLabel>Last Name</FormLabel>
                  <TextField defaultValue={user.lastName} size="small"></TextField>
                </Stack>
              </Stack>
              <Stack
                direction="row"
                justifyContent="space-between"
                spacing={4}
              >
                <Stack flex="1">
                  <FormLabel>User Name</FormLabel>
                  <TextField defaultValue={user.username} size="small"></TextField>
                </Stack>
                <Stack flex="1">
                  <FormLabel>Email</FormLabel>
                  <TextField defaultValue={user.email} size="small"></TextField>
                </Stack>
              </Stack>
            </Stack>
          </Stack>

          <Stack
            paddingBottom={5}
            borderBottom="1px solid #e0e0e0"
            marginBottom="50px"
          >
            <Stack spacing={2}>
              <Stack direction={'row'} spacing={2}>
                <Stack flex="1">
                  <FormLabel>Goals</FormLabel>
                  <Select
                    name="goals"
                    size="small"
                    defaultValue={user.goals}
                  >
                    <MenuItem value={1}>Lose Fat</MenuItem>
                    <MenuItem value={2}>Gain Muscle</MenuItem>
                    <MenuItem value={3}>Maintain Weight</MenuItem>
                  </Select>
                </Stack>
                <Stack flex="1">
                  <FormLabel>Daily Activities</FormLabel>
                  <Select
                    label="Daily Activities"
                    name="activities"
                    size="small"
                    defaultValue={user.activities}
                  >
                    <MenuItem value={1}>Low</MenuItem>
                    <MenuItem value={2}>Medium</MenuItem>
                    <MenuItem value={3}>High</MenuItem>
                  </Select>
                </Stack>
              </Stack>

              <Stack direction={'row'} spacing={2}>
                <Stack flex="1">
                  <FormLabel>Height / cm</FormLabel>
                  <TextField
                    size="small"
                    name="height"
                    defaultValue={user.height}
                  />
                </Stack>
                <Stack flex="1">
                  <FormLabel>width / kg</FormLabel>
                  <TextField
                    size="small"
                    name="width"
                    defaultValue={user.width}
                  />
                </Stack>
              </Stack>

              <Stack direction={'row'} spacing={2}>
                <Stack flex="1">
                  <FormLabel>Age</FormLabel>
                  <TextField
                    size="small"
                    name="age"
                    defaultValue={user.age}
                  />
                </Stack>
                <Stack flex="1">
                  <FormLabel>Gender</FormLabel>
                  <Select
                    name="gender"
                    size="small"
                    defaultValue={user.gender}
                  >
                    <MenuItem value={1}>Male</MenuItem>
                    <MenuItem value={2}>Female</MenuItem>
                    <MenuItem value={3}>Other</MenuItem>
                  </Select>
                </Stack>
              </Stack>
            </Stack>
          </Stack>

          <Stack
            paddingBottom={5}
            borderBottom="1px solid #e0e0e0"
            marginBottom="50px"
            direction="row"
            justifyContent="flex-end"
            spacing={4}
          >
            {/* <Button type="reset" variant="contained" color="secondary">Cancel</Button> */}
            <Button type="submit" variant="contained" color="warning">Save Change</Button>
          </Stack>
        </form>

        
        
        <Stack
          paddingBottom={5}
          borderBottom="1px solid #e0e0e0"
          marginBottom="50px"
        >
          <Button variant="contained" color="error">Logout</Button>
        </Stack>
      </Box>
    </Stack>
  )
}

export default Profile
