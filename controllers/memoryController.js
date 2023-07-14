import memoryModel from "../models/memoryModel.js";

export const getMemory = async (req, res) => {
  const {ram_freq, ram_type, search} = req.query;
  const query = {}

  if(ram_freq){
    query.ram_freq = ram_freq;
  }

  if(ram_type){
    const ramTypes = ram_type.split(",");
  query.ram_type = { $in: ramTypes };
  }

  if (search) {
    query.name = { $regex: search, $options: 'i' };
  }

  try {
    const memory = await memoryModel.find(query);
    res.status(200).json(memory);
  } catch (error) {
    console.error('Error fetching Memorys:', error);
    res.status(500).json({ error: 'An error occurred while fetching Memorys' });
  }
};

export const addMemory = async(req, res) => {
  const new_memory = await memoryModel.create(req.body)
  res.status(201).json(new_memory)
}

export const updateMemory = async(req, res) => {
  const update_memory = await memoryModel.updateMany(req.body)
  res.status(201).json(update_memory)
}


export const getMemoryById = async(req, res) => {
  const id = req.params.id
  
  try{
    const memoryData = await memoryModel.findById(id)
    if(memoryData){
      return res.status(200).json(memoryData)
    }else{
      return res.status(404).json(`not found`)
    }
  }catch(error){
    res.status(500).json({ error: 'An error occurred while fetching Memorys' });
  }
}