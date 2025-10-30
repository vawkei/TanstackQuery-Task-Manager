import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    title:{
        type: String,
        trim:true,
        required:[true,"must provide title"],
        minlength:[3,"title should be more than 3 characters"],
        maxlength:[20,"title shouldn't be more than 20 characters"]
    },
    description:{
        type:String,
        required:[true,"must provide description"],
        minlength:[3,"please add more words"]
    },
    status:{
        type:Boolean,
        default:false
    },
    dateDue:{
        type:String,
        required:[true,"please set a date"]
    }
},{timestamps:true})

export default mongoose.model("Tasks",TaskSchema);
