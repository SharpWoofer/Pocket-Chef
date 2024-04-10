import mongoose from 'mongoose';

const calorieSchema = new mongoose.Schema({

    date: {
        type: Date,
        default: Date.now,
    },

    username: {
        type: String,
        required: true,
    },

    breakfastCal: {
        type: Number,
        default: 0,
    },

    lunchCal: {
        type: Number,
        default: 0,
    },

    dinnerCal: {
        type: Number,
        default: 0,
    }

});

const Calorie = mongoose.model('Calorie', calorieSchema);

export default Calorie;
  