import express from 'express';
import {createUser, addComponent, getUsers, getUserById, getUserComponent, deleteUserComponent, verifyUser} from '../controllers/userController.js';
import { getMotherboard, addMotherboard, getMotherboardById } from '../controllers/motherboardController.js';
import { getCpu, addCpu, getCpuById, updateCpu } from '../controllers/cpuController.js';
import { addMemory, getMemory, getMemoryById } from '../controllers/memoryController.js';
import { addGpu, getGpu, getGpuById } from '../controllers/gpuController.js';
import { getPsu, addPsu, getPsuById } from '../controllers/psuController.js';

const router = express.Router();

// get user
router.get('/users', getUsers)
router.get('/users/:linkId', getUserById)
router.get('/users/:userId/component', getUserComponent)

router.delete('/delete/:componentType', deleteUserComponent)

router.get('/create', createUser);
router.get('/verify', verifyUser)
router.post('/add', addComponent);

router.get('/cpu', getCpu)
router.post('/cpu', addCpu)
router.put('/cpu/:id', updateCpu)
router.get('/cpu/:id', getCpuById)

router.get('/motherboard', getMotherboard)
router.post('/motherboard', addMotherboard)
router.get('/motherboard/:id', getMotherboardById)

router.get('/memory', getMemory)
router.post('/memory', addMemory)
router.get('/memory/:id', getMemoryById)

router.get('/gpu', getGpu)
router.get('/gpu/:id', getGpuById)
router.post('/gpu', addGpu)

router.get('/psu', getPsu)
router.post('/psu', addPsu)
router.get('/psu/:id', getPsuById)

export default router
