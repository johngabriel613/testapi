import motherboardModel from "../models/motherboardModel.js";

export const getMotherboard = async(req, res) => {
  const {socket_type, ram_type, ram_freq, search} = req.query;
  const query = {}

  if(socket_type){
    query.socket_type = socket_type;
  }
  
  if (ram_type) {
    query.ram_type = { $in: ram_type.split(",") };
  }

  if(ram_freq){
    query.max_ram_freq = ram_freq;
  }

  if (search) {
    query.name = { $regex: search, $options: 'i' };
  }

  try {
    const motherboard = await motherboardModel.find(query);
    res.status(200).json(motherboard);
  } catch (error) {
    console.error('Error fetching Motherboards:', error);
    res.status(500).json({ error: 'An error occurred while fetching Motherboards' });
  }
}

export const addMotherboard = async(req, res) => {
  const new_motherboard = await motherboardModel.create(req.body)
  res.status(201).json(new_motherboard)
}

export const getMotherboardById = async(req, res) => {
  const id = req.params.id
  
  try{
    const motherboardData = await motherboardModel.findById(id)
    if(motherboardData){
      return res.status(200).json(motherboardData)
    }else{
      return res.status(404).json(`not found`)
    }
  }catch(error){
    res.status(500).json({ error: 'An error occurred while fetching Motherboards' });
  }
}
