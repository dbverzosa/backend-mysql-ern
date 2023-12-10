import Vehicle from "../models/VehicleModel.js"
import User from "../models/UserModel.js";
import { Op } from "sequelize";


export const getVehicles = async (req, res) => {
    try {
        let response;
        if (req.role === "admin") {
            response = await Vehicle.findAll({
                attributes: ['id', 'brand', 'model', 'color', 'variant', 'body', 'price', 'status', 'image1', 'image2', 'image3'],
                include: [{
                    model: User,
                    attributes: ['name', 'email', 'role', 'phone', 'location', 'image']
                }]
            });
        } else {
            response = await Vehicle.findAll({
                attributes: ['id', 'brand', 'model', 'color', 'variant', 'body', 'price', 'status', 'image1', 'image2', 'image3'],
                where: {
                    userId: req.userId
                },
                include: [{
                    model: User,
                    attributes: ['name', 'email', 'role', 'phone', 'location', 'image']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const getVehicleById = async (req, res) => {
    try {
        const vehicle = await Vehicle.findOne({
            where: {
                id: req.params.id
            }
        })
        if (!vehicle) return res.status(404).json({ msg: "Data not Found" })

        let response;
        if (req.role === "admin") {
            response = await Vehicle.findOne({
                attributes: ['id', 'brand', 'model', 'color', 'variant', 'body', 'price', 'status', 'image1', 'image2', 'image3'],
                where: {
                    id: vehicle.id
                },
                include: [{
                    model: User,
                    attributes: ['name', 'email', 'role', 'phone', 'location', 'image']
                }]
            });
        } else {
            response = await Vehicle.findOne({
                attributes: ['id', 'brand', 'model', 'color', 'variant', 'body', 'price', 'status', 'image1', 'image2', 'image3'],
                where: {
                    [Op.and]: [{ id: vehicle.id }, { userId: req.userId }]
                },
                include: [{
                    model: User,
                    attributes: ['name', 'email', 'role', 'phone', 'location', 'image']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const createVehicle = async (req, res) => {
    const { brand, model, color, variant, body, price, status, image1, image2, image3 } = req.body;
    try {
        await Vehicle.create({
            brand: brand,
            model: model,
            color: color,
            variant: variant,
            body: body,
            price: price,
            status: status,
            image1: image1,
            image2: image2,
            image3: image3,
            userId: req.userId
        });
        res.status(201).json({ msg: "Vehicle Created Successfuly" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const updateVehicle = async (req, res) => {
try {
    const vehicle = await Vehicle.findOne({
        where: {
            id: req.params.id
        }
    })
    if (!vehicle) return res.status(404).json({ msg: "Data not Found" })
        const { brand, model, color, variant, body, price, status, image1, image2, image3 } = req.body;
        if (req.role === "admin") {
            await Vehicle.update({ brand, model, color, variant, body, price, status, image1, image2, image3 }, {
                where: {
                    id: vehicle.id
                }
            })
        } else {
            if (req.userId !== vehicle.userId) return res.status(403).json({ msg: "Access is forbidden" })
            await Vehicle.update({ brand, model, color, variant, body, price, status, image1, image2, image3 }, {
                where: {
                    [Op.and]: [{ id: vehicle.id }, { userId: req.userId }]
                }
            })
        }
        res.status(200).json({ msg: "Vehicle updated Successfully" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }

}

export const deleteVehicle = async (req, res) => {
    try {
        const vehicle = await Vehicle.findOne({
            where: {
                id: req.params.id
            }
        })
        if (!vehicle) return res.status(404).json({ msg: "Data not Found" })
            const { brand, model, color, variant, body, price, status, image1, image2, image3 } = req.body;
            if (req.role === "admin") {
                await Vehicle.destroy({
                    where: {
                        id: vehicle.id
                    }
                })
            } else {
                if (req.userId !== vehicle.userId) return res.status(403).json({ msg: "Access is forbidden" })
                await Vehicle.update({ brand, model, color, variant, body, price, status, image1, image2, image3 }, {
                    where: {
                        [Op.and]: [{ id: vehicle.id }, { userId: req.userId }]
                    }
                })
            }
            res.status(200).json({ msg: "Vehicle deleted Successfully" });
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    

}