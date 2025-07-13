import Message from "../models/Message.js";
import User from "../models/User.js";
//get all user except the logged in user 

export const getUsersForSidebar = async (req, res) => {
    try {
        const userId = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: userId } }).select("-password");

        //count no od message not seen 

        const unseenMessages = {}
        const promises = filteredUsers.map(async () => {
            const messages = await Message.find({ senderId: user._id, recieverId: userId, seen: false })
            if (messages.length > 0) {
                unseenMessages[user._id] = messages.length;

            }
        })
        await promise.all(promises);
        res, json({ seccess: true, users: filteredUsers, unseenMessages })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })

    }

}

//get all message sfor selected user 

export const getMessages=async(req,res)=>{
    try {
        const {id: selectedUserId}=req.params;
        const myId=req.user._id;

        const messages=await Message.find({
            $or:[
                {senderId:myId, recieverId: selectedUserId},
                {senderId:selectedUserId, recieverId: myId},
            ]
        })
        await Message.updateMany({senderId: selectedUserId, recieverId:myId},
            {seen:true});
            res.json9{success:true, messages}
        
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })

        
    }
}
//api to mark message as seen using message id 
export const markMessageAsSeen=async (req,res)=>{
    try {
        const {id}=req.params;
        await Message.findByIdAndUpdate(id, {seen:true})
        res.json({success:true})
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}