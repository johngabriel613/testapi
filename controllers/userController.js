import userModel from "../models/userModel.js";
import { v4 as uuidv4 } from "uuid";

//generate random linkId
const generateLinkId = () => {
  const alphanumericChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let linkId = '';
  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * alphanumericChars.length);
    linkId += alphanumericChars[randomIndex];
  }
  return linkId;
}

//create user
export const createUser = async(req, res) => {
    try{
      req.session.userId = uuidv4();
      await userModel.create({
        userId: req.session.userId,
        linkId: generateLinkId(),
        components: [
          { type: 'CPU'},
          { type: 'Motherboard'},
          { type: 'Memory'},
          { type: 'GPU'},
          { type: 'PSU'}
        ]
      });
      const user = await userModel.findOne({userId: req.session.userId})
      .populate('components.id')
      .exec();
      
      if(user){
        return res.status(201).json(user);
      }
    }catch(error){
      res.status(500).json(`server error: ${error.message}`)
    }
}

//verify user
export const verifyUser = async(req, res) => {
  try{
    if(req.session.userId){
      const user = await userModel.findOne({ userId: req.session.userId })
      .populate('components.id')
      .exec();
    
      if(user){
        return res.status(200).json(user);
      }
    }else{
      await createUser(req, res)
    } 
  }catch(error){
    return res.status(500).json({ error: `Server error: ${error.message}` });
  }
}

//add or update component
export const addComponent = async(req, res) => {
  try {
    const userId = req.session.userId;
    const {type, id} = req.body.data;
    
    if (userId) {
      userModel.findOne({userId : userId})
      .populate('components.id')
      .exec()
      .then(user => {
        if(user){
          const index = user.components.findIndex(component => component.type === type);
          if(index !== -1){
            user.components[index].id = id;
            return user.save()
          }
        }
      })
      .then(updatedUser => {
        return res.status(201).json(updatedUser);
      })
      .catch(error => {
        console.error('Error updating user components:', error);
        res.status(500).json({ error: 'An error occurred while updating the user components' });
      });
      
    }else{
      await createUser(req, res)
      const user = await userModel.findOne({userId:req.session.userId})
      res.json(user);
    }
  } catch (error) {
    if (!res.headersSent) {
      res.status(500).json('Internal Server Error');
    } else {
      console.log('Error occurred, but response already sent:', error);
    }
  }
}


export const getUsers = async(req, res) => {
  try{
    const users = await userModel.find()
    .populate('components.id')
    .exec()

    res.json(users)
  }catch(error){
    res.json(`message:${error.message}`)
  }
}

export const getUserById = async(req, res) => {
  try{
    const {linkId} = req.params
    const user = await userModel.findOne({linkId : linkId})
    .populate('components.id')
    .exec()
    res.json(user)

  }catch(error){
    res.json(`message:${error.message}`)
  }
}

export const getUserComponent = async(req, res) => {
  try{
    const {userId} = req.params
    const user = await userModel.findOne({userId : userId})
    res.json(user.components.cpu)

  }catch(error){
    res.json(`message:${error.message}`)
  }
}

export const deleteUserComponent = async(req, res) => {
  try{
    const userId = req.session.userId
    const {componentType} = req.params

    if(userId){
      userModel.findOne({userId:userId})
      .populate('components.id')
      .exec()
      .then(user => {
        if(user){
          const index = user.components.findIndex(component => component.type === componentType);
          if(index !== -1){
            user.components[index].id = null;
            return user.save()
          }
        }
      })
      .then(updatedUser => {
        return res.status(201).json(updatedUser);
      })
      .catch(error => {
        console.error('Error updating user components:', error);
        res.status(500).json({ error: 'An error occurred while updating the user components' });
      });
    } else {
      throw new Error('Invalid userId');
    }
    
  }catch(error){
    res.json(`message:${error.message}`)
  }
}