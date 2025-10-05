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

export const updateShipment = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('hello1');
    if (!id) return res.status(400).json({ error: "Shipment ID is required" });

    const { newdescription, newstatus } = req.body;
    console.log('hello2');
    if (!newdescription || !newstatus) 
      return res.status(400).json({ error: "New description and status are required" });

    const owner = await Shipment.findById(id).select("owner");
    console.log('hello3');
    if (!owner) return res.status(404).json({ error: "Shipment not found" });

    // Correct comparison
    console.log(owner.owner.toString(), req.user);
    if (owner.owner.toString() !== req.user)
      return res.status(401).json({ error: "Unauthorized" });

    const shipment = await Shipment.findByIdAndUpdate(
      id,
      { description: newdescription, status: newstatus },
      { new: true }
    );
    console.log('hello4');

    res.json(shipment);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Failed to update shipment" });
  }
}; 

export const deleteShipment = async (req, res) => {
  try {
    console.log('hello') ;
    const { id } = req.params;
    console.log('hello2') ;
    if(!id) return res.status(400).json({ error: "Shipment ID is required" });
    const shipment = await Shipment.findByIdAndDelete(id);
    if (!shipment) {
      return res.status(404).json({ error: "Shipment not found" });
    }
    res.json({ message: "Shipment deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: "Failed to delete shipment" });
  }
};