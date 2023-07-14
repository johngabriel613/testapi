import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userId:{
    type: String,
    required: true
  },
  linkId:{
    type: String,
    required: true
  },
  components: [
    {
      _id: false,
      type: {
        type: String,
        required: true
      },
      id: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'components.type',
        default: null
      }
    }
  ]
})

const userModel = mongoose.model('user', userSchema)

export default userModel