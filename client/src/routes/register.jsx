import { Box, Button, FormControl, FormLabel, IconButton, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { Apple, Facebook, Google } from "@mui/icons-material"
import { useRegisterMutation } from "../store/apis/auth"
import Link from "../components/Link"


const Register = () => {
    const mNavigate = useNavigate()
    const [register, { data, error }] = useRegisterMutation();

    const handleRegister = async (event) => {
        event.preventDefault();
        const mELements = event.target.elements;
        const payload = {
            email: mELements.email.value,
            username: mELements.username.value,
            password: mELements.password.value,
            goals: mELements.goals.value,
            activities: mELements.activities.value,
            height: mELements.height.value,
            weight: mELements.weight.value,
            firstName: mELements.firstName.value,
            lastName: mELements.lastName.value,
            age: mELements.age.value,
            gender: mELements.gender.value,
            //picture: mELements.picture.files[0]
        };
    
        // Use the register function to trigger the mutation with the payload
        const response = await register(payload);

        // Check if there was an error during the mutation execution
        if (response.error) {
            const errorMessage = response.error.data.error;
            console.error("An error occurred:", errorMessage);
            // Display the error message to the user
            alert("An error occurred: " + errorMessage);
        } else {
            // Handle the successful response data here
            console.log("Response from server:", response.data);
            alert("Registration success, you will be redirected to login page");
            mNavigate('/login');
        }
    };
    

    return (
        <Box
            display={'flex'}
            alignItems={'center'}
            // height={'100vh'}
            // width={'100vw'}
            // overflow={'auto'}
            justifyContent={'center'}
        >
            <Stack
                spacing={2}
                padding={1}
                width={'500px'}
            >
                <Stack>
                    <Typography
                        marginBottom={2}
                        textAlign={'center'}
                        fontSize={40}
                        color={'#666'}
                        fontWeight={'bold'}
                    >
                        Welcome Back
                    </Typography>
                    <Box
                        marginBottom={2}
                        textAlign={'center'}
                        fontWeight={'bold'}
                    >
                        <Typography fontSize={19}  ><Link to="/login">Sign in</Link> to track your progress, or <Link to="/register">register</Link> to personalize</Typography>
                        <Typography fontSize={19}>Your fitness journey with custom workout plans, calorie</Typography>
                        <Typography fontSize={19}>tracking, and more.</Typography>
                    </Box>
                </Stack>
                <form
                    onSubmit = {handleRegister}
                >
                    <Stack spacing={4}>
                        <Stack paddingLeft={4} spacing={4} paddingRight={4}>
                            <Stack direction={'row'} spacing={2}>
                                <FormControl fullWidth>
                                    <InputLabel size="small">Goals</InputLabel>
                                    <Select
                                        required
                                        label="Goals"
                                        name="goals"
                                        size="small"
                                    >
                                        <MenuItem value={1}>Lose Fat</MenuItem>
                                        <MenuItem value={2}>Gain Muscle</MenuItem>
                                        <MenuItem value={3}>Maintain Weight</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl fullWidth>
                                    <InputLabel size="small">Daily Activities</InputLabel>
                                    <Select
                                        required
                                        label="Daily Activities"
                                        name="activities"
                                        size="small"
                                    >
                                        <MenuItem value={1}>Low</MenuItem>
                                        <MenuItem value={2}>Medium</MenuItem>
                                        <MenuItem value={3}>High</MenuItem>
                                    </Select>
                                </FormControl>
                            </Stack>
                            <Stack direction={'row'} spacing={2}>
                                <TextField
                                    size="small"
                                    name="height"
                                    required
                                    label='Height / cm'
                                />
                                <TextField
                                    size="small"
                                    name="weight"
                                    required
                                    label='Weight / kg'
                                />
                            </Stack>
                            <Stack direction={'row'} spacing={2}>
                                <TextField
                                    size="small"
                                    name="firstName"
                                    required
                                    label='First Name'
                                />
                                <TextField
                                    size="small"
                                    name="lastName"
                                    required
                                    label='Last Name'
                                />
                            </Stack>
                            <Stack direction={'row'} spacing={2}>
                                <TextField
                                    size="small"
                                    name="age"
                                    required
                                    label='Age'
                                />
                                <FormControl fullWidth>
                                    <InputLabel size="small">Gender</InputLabel>
                                    <Select
                                        required
                                        label="Gender"
                                        name="gender"
                                        size="small"
                                    >
                                        <MenuItem value={1}>Male</MenuItem>
                                        <MenuItem value={2}>Female</MenuItem>
                                        <MenuItem value={3}>Other</MenuItem>
                                    </Select>
                                </FormControl>
                            </Stack>
                            <TextField
                                size="small"
                                name="username"
                                required
                                label='Username'
                            />
                            <TextField
                                size="small"
                                name="email"
                                required
                                label='Email'
                            />
                            <TextField
                                size="small"
                                name="password"
                                required
                                label='Password'
                                type='password'
                            />
                            <Stack direction={'row'} spacing={1}>
                                <FormLabel>Avatar</FormLabel>
                                <input name="picture" required type="file" />
                            </Stack>
                            <Stack alignItems={'center'} justifyContent={'center'}>
                                <Button
                                    type='submit'
                                    variant='contained'
                                    sx={{
                                        width: '300px',
                                        background: '#a4be9b'
                                    }}
                                >
                                    Register
                                </Button>
                            </Stack>
                        </Stack>
                        <Stack>
                            <Box
                                display={'flex'}
                                alignItems={'center'}
                                justifyContent={'center'}
                                textAlign={'center'}
                                sx={{
                                    padding: '1px',
                                    position: 'relative',
                                    background: 'linear-gradient(to right,#fff,#000,#fff)'
                                }}
                            >
                                <Typography
                                    position={'absolute'}
                                    sx={{ background: '#fff', padding: '0 20px' }}
                                >
                                    Or sign up with
                                </Typography>
                            </Box>
                        </Stack>
                        <Stack
                            justifyContent={'center'}
                            direction={'row'}
                        >
                            <IconButton>
                                <Google></Google>
                            </IconButton>
                            <IconButton>
                                <Facebook></Facebook>
                            </IconButton>
                            <IconButton>
                                <Apple></Apple>
                            </IconButton>
                        </Stack>
                    </Stack>
                </form>
            </Stack>
        </Box>
        // <Box
        //   display={'flex'}
        //   width={'100%'}
        //   paddingTop={4}
        //   alignItems={'center'}
        //   justifyContent={'center'}
        // >
        //   <Stack
        //     padding={1}
        //     width={'800px'}
        //   >
        //     <Typography marginBottom={2} textAlign={'center'} fontSize={40} fontWeight={'bold'}>Welcome - Please Reg</Typography>
        //     <form
        //       onSubmit={async(event) => {
        //         event.preventDefault()
        //         await axios.post('http://localhost:5000/auth/reg', event.target)
        //         alert('Reg success')
        //         mNavigate('/login')
        //       }}
        //       >
        //       <Stack spacing={2}>
        //         <Stack spacing={1}>
        //           <FormLabel>Username</FormLabel>
        //           <TextField required name="username" label='username' />
        //         </Stack>
        //         <Stack spacing={1}>
        //           <FormLabel>Email</FormLabel>
        //           <TextField required name="email" label='email' />
        //         </Stack>
        //         <Stack spacing={1}>
        //           <FormLabel>Password</FormLabel>
        //           <TextField required name="password" label='password' type='password' />
        //         </Stack>
        //         <Stack spacing={1}>
        //           <FormLabel>Avater</FormLabel>
        //           <input name="picture" required type="file" />
        //         </Stack>
        //         <Stack direction={'row'} justifyContent={'flex-end'} spacing={1}>
        //           <Typography>Already have an account?</Typography>
        //           <Link to={'/login'}>Go Login</Link>
        //           {/* <Typography color={'blue'} onClick={() => }>Go Reg</Typography> */}
        //         </Stack>
        //         <Button type='submit' variant='contained'>Login</Button>
        //       </Stack>
        //     </form>
        //   </Stack>
        // </Box>
    )
}

export default Register
