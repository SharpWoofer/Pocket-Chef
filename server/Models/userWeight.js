import mongoose, {SchemaTypes} from "mongoose";

const UserWeightSchema = mongoose.Schema({
    user: {
        type: SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
    },
    weight: {
        type: SchemaTypes.Number,
        required: true,
    },
    datetime: {
        type: SchemaTypes.String,
        required: true,
    },
}, {timestamps: true});

export const UserWeight = mongoose.model("UserWeight", UserWeightSchema);
export default UserWeight;
