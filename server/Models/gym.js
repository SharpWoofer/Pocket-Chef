import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const gymSchema = new Schema ({
    name: {
        type : String,
        required : true
    },

    addressBuildingName: {
        type: String // only put if its located in a building e.g mall
    },
    
    addressPostalCode: {
        type: String,
        required: true,
    },

    addressStreetName: {
        type: String,
        required: true,
    },
    
    operatingHours: {
        type: [String],
        required: true
    },

    phoneNumber: {
        type: Number,
        required: true
    },

    coordinates: {
        type: [Number],
        required: true
    }
});

const Gym = mongoose.model('Gym', gymSchema);

export default Gym;