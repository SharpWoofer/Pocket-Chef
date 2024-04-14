import {useEffect, useState} from "react";
//import { Search } from "@mui/icons-material";
//import { useDebounce } from "@uidotdev/usehooks"
import {useGetCalCountMutation} from '../../store/apis/ingredient';
import dayjs from 'dayjs';
import {useSelector} from 'react-redux';
import {LineChart} from '@mui/x-charts/LineChart';


function CalorieGraph({ selectedDate }) {
    const currentUser = useSelector(state => state.auth.user.username);
    const [getCalCount] = useGetCalCountMutation();
    const [calData, setCalData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                //const startDate = dayjs().startOf("month");
                const startDate = selectedDate.clone().startOf('month');
                const endDate = selectedDate.clone().endOf('month');
                //const endDate = dayjs().endOf("month");

                // Array to store calorie data for each day of the month
                const calorieData = [];

                // Loop through each day of the month
                for (let date = startDate; date.isBefore(endDate) || date.isSame(endDate); date = date.add(1, "day")) {

                    // Fetch calorie count for the current date
                    console.log(date.format('YYYY-MM-DD'));
                    const {data: temp} = await getCalCount({
                        username: currentUser,
                        date: date.format('YYYY-MM-DD')
                    });
                    // Extract calorie count from the response
                    let calorieCount = 0;
                    if (temp) {
                        calorieCount = temp.breakfastCal + temp.lunchCal + temp.dinnerCal;
                    }
                    // Add calorie count to the calorieData array
                    calorieData.push({date: date.format("D"), calories: calorieCount});
                }

                // Set the calorie data to state
                setCalData(calorieData);
            } catch (error) {
                console.error("Error fetching calorie data:", error);
            }
        };

        fetchData();
    }, [selectedDate, currentUser, getCalCount]);

    return (
        <LineChart
            xAxis={[{data: calData.map((entry) => entry.date)}]}
            series={[{data: calData.map((entry) => entry.calories)}]}
            width={800}
            height={450}
        />
    );

}

export default CalorieGraph;
