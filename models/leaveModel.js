import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
const Schema = mongoose.Schema;
const leavesSchema = new Schema(
  {
    employeeName: {
      type: String,
      required: true,
    },
    leaveType: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
    },
     endDate: {
      type: Date,
    },
   
    description: {
      type: String,
    },
    reason:{
        type:String,
    },
    status: {
      type: String,
    },
    userId:{
      type:Schema.Types.ObjectId, 
      ref:'User'
    }
  },
  {
    timestamps: true,
  }
);

const Leaves = mongoose.model('Leaves', leavesSchema);

export default Leaves;
