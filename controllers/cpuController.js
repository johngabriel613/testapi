import cpuModel from "../models/cpuModel.js";

export const getCpu = async (req, res) => {
  const {socket_type, ram_type, ram_freq, search} = req.query;
  const query = {}

  if(socket_type){
    query.socket_type = socket_type;
  }

  if(ram_type){
    query.ram_type = { $in: ram_type.split(",") }
  }

  if(ram_freq){
    query.ram_freq = { $in: ram_freq.split(",") };
  }

  if (search) {
    query.name = { $regex: search, $options: 'i' };
  }

  try {
    const cpu = await cpuModel.find(query);
    res.status(200).json(cpu);
  } catch (error) {
    console.error('Error fetching CPUs:', error);
    res.status(500).json({ error: 'An error occurred while fetching CPUs' });
  }
};

export const addCpu = async(req, res) => {
  const new_cpu = await cpuModel.create(req.body)
  res.status(201).json(new_cpu)
}

export const updateCpu = async(req, res) => {
  const { id } = req.params
  try{
    const update_cpu = await cpuModel.findByIdAndUpdate(id, req.body)
    res.status(201).json(update_cpu)
  }catch(error){
    res.status(500).json({ error: error.message })
  }
}

export const getCpuById = async(req, res) => {
  const id = req.params.id
  
  try{
    const cpuData = await cpuModel.findById(id)
    if(cpuData){
      return res.status(200).json(cpuData)
    }else{
      return res.status(404).json(`not found`)
    }
  }catch(error){
    res.status(500).json({ error: 'An error occurred while fetching CPUs' });
  }
}

