import express from "express";
import { createVehicle, deleteVehicle, getVehicleById, getVehicles, updateVehicle } from "../controllers/Vehicles.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();


router.get('/vehicles', verifyUser, getVehicles);
router.get('/vehicles/:id', verifyUser, getVehicleById);
router.post('/vehicles', verifyUser, createVehicle);
router.patch('/vehicles/:id', verifyUser, updateVehicle);
router.delete('/vehicles/:id', verifyUser, deleteVehicle);


export default router;