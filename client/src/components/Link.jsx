import { Link as RouterLink } from 'react-router-dom';
import { Link as MuiLink } from '@mui/material';

function Link(props) {
    return <MuiLink component={RouterLink} {...props} />;
}

export default Link;
