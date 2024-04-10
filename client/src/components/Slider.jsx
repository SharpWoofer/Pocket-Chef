import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function valuetext(value) {
    return `${value}`;
}

export default function RangeSlider({calories, onChange}) {

    const handleChange = (event) => {
        const {
            target: {value},
        } = event;
        onChange(value)
    };

    return (
        <Box sx={{width: 300}}>
            <Slider
                min={0}
                max={2000}
                value={calories}
                onChange={handleChange}
                valueLabelDisplay="auto"
                marks={[{value: 0, label: '0'}, {value: 2000, label: '2000'}]}
            />
        </Box>
    );
}


