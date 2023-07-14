import gpuModel from "../models/gpuModel.js";

export const getGpu = async(req, res) => {
  const {pcie_x16, search} = req.query;
  const query = {}

  if(pcie_x16){
    query.pcie_x16 = pcie_x16;
  }
  
  if (search) {
    query.name = { $regex: search, $options: 'i' };
  }

  try {
    const gpu = await gpuModel.find(query);
    res.status(200).json(gpu);
  } catch (error) {
    console.error('Error fetching GPUs:', error);
    res.status(500).json({ error: 'An error occurred while fetching GPUs' });
  }
}

export const addGpu = async(req, res) => {
  const new_gpu = await gpuModel.create(req.body)
  res.status(201).json(new_gpu)
}

export const getGpuById = async(req, res) => {
  const id = req.params.id
  
  try{
    const gpuData = await gpuModel.findById(id)
    if(gpuData){
      return res.status(200).json(gpuData)
    }else{
      return res.status(404).json(`not found`)
    }
  }catch(error){
    res.status(500).json({ error: 'An error occurred while fetching GPUs' });
  }
}