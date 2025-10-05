import Shipment from "../models/Shipment.js";
import user from "../models/User.js";

export const createShipment = async (req, res) => {
  try {
    const { description, status, fragile, weight , distance } = req.body;
    // console.log({ description, status, fragile, weight , distance }) ;
    // Validate required fields
    if (!description || weight === undefined || distance === undefined) {
      return res.status(400).json({ error: "Description, weight, and distance are required" });
    }
    
    // Create shipment with user ID from authenticated token
    const shipment = await Shipment.create({
      description,
      status: status || 'pending',
      fragile: fragile || false,
      weight: parseInt(weight), 
      distance: parseInt(distance),
      owner: req?.user
    });
    console.log(shipment) ;
    res.status(201).json(shipment);
  } catch (err) {
    console.error('Create shipment error:', err);
    res.status(400).json({ error: err.message || "Failed to create shipment" });
  }
};

export const getShipments = async (req, res) => {
  try {
    console.log('hello1') ; 
    const  userId  = req?.user;
    console.log('hello12') ; 
    if(!userId) return res.status(401).json({ error: "Unauthorized" });
    console.log('hello2') ; 
    const username = await user.findById(userId).select("username");
    console.log('hello3') ; 
    if(!username) return res.status(404).json({ error: "User not found" });
    console.log('hello4') ; 
    const shipments = await Shipment.find({ owner: userId });
    res.json({ shipments, username: username.username });
    // const { status } = req.query;
    // const filter = status ? { status } : {};
    // const shipments = await Shipment.find(filter);
    // res.json(shipments);
  } catch (err) {
    res.status(400).json({ error: "Failed to fetch shipments" });
  }
};

