import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';
import Leaves from '../models/leaveModel.js';

const STATUS = {
    NEW: 'NEW',
    CANCEL: 'CANCEL',
    APPROVE: 'APPROVED',
    REJECT:'REJECTED'
}


const applyLeave = asyncHandler(async (req, res) => {
  const { employeeName,
  leaveType,
  startDate,
  endDate,
  description,
  reason,
  status = STATUS.NEW,
  userId} = req.body;

  const user = await User.findOne({ _id: userId });

  console.log('user',user,req.body);
  if (user) {
   const data = await Leaves.create({
        employeeName,
        leaveType,
        startDate,
        endDate,
        description,
        reason,
        status,
        userId
        });
        return res.json({message:'Leaves applied successfully'});
  } else {
    res.status(401);
    throw new Error('No user exists');
  }
});


//@desc Get user profile
//@routes GET /api/users/profile
// @access Private

const getUserLeaves = asyncHandler(async (req, res) => {
   const user = await User.findOne({ _id: req.params.id });
  console.log('user',user);
  if (user) {

    const leaves = await Leaves.find({employeeName:user.name}).exec()
    console.log('leaves',leaves);
    res.json(leaves);
  } else {
    res.status(401);
    throw new Error('User not found');
  }
});

const getLeavesDetails = asyncHandler(async (req, res) => {
   const user = await User.findOne({ _id: req.params.id });

  if (user) {

    const leaveDetails = await Leaves.findById({_id:req.params.leaveId}).exec()
    console.log('leaveDetails',leaveDetails);
    res.json({leaveDetails});
  } else {
    res.status(401);
    throw new Error('User not found');
  }
});


const cancelLeaves = asyncHandler(async (req, res) => {
    const leaveDetails = await Leaves.findOneAndUpdate({_id:req.params.leaveId}, {status:STATUS.CANCEL}).exec()
    console.log('Leaves Cancelled Successfully');
    res.json({leaveDetails});
});
const approveOrRejectLeaves = asyncHandler(async (req, res) => {
    let {isApprove }= req.body;
    console.log('isApprove',isApprove)
    const leaveDetails = await Leaves.findOneAndUpdate({_id:req.params.leaveId}, {status:isApprove ? STATUS.APPROVE : STATUS.REJECT}).exec()
    console.log('Leaves Updated Successfully');
    res.json({leaveDetails});
});


export {
    applyLeave,
    getUserLeaves,
    getLeavesDetails,
    cancelLeaves,
    approveOrRejectLeaves
};
