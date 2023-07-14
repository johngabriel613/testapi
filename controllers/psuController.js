import psuModel from "../models/psuModel.js";

export const getPsu = async (req, res) => {
  const {wattage} = req.query;
  const query = {}

  if(wattage){
    query.output = { $gt: parseInt(wattage) };
  }



  try {
    const psu = await psuModel.find(query);
    res.status(200).json(psu);
  } catch (error) {
    console.error('Error fetching PSUs:', error);
    res.status(500).json({ error: 'An error occurred while fetching PSUs' });
  }
};

export const addPsu = async(req, res) => {
  const new_psu = await psuModel.create(req.body)
  res.status(201).json(new_psu)
}

export const updatePsu = async(req, res) => {
  const { id } = req.params
  try{
    const update_psu = await psuModel.findByIdAndUpdate(id, req.body)
    res.status(201).json(update_psu)
  }catch(error){
    res.status(500).json({ error: error.message })
  }
}

export const getPsuById = async(req, res) => {
  const id = req.params.id
  
  try{
    const psuData = await psuModel.findById(id)
    if(psuData){
      return res.status(200).json(psuData)
    }else{
      return res.status(404).json(`not found`)
    }
  }catch(error){
    res.status(500).json({ error: 'An error occurred while fetching PSUs' });
  }
}

