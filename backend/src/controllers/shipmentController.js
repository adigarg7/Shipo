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
    const userId = req?.user;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const username = await user.findById(userId).select("username");
    if (!username) return res.status(404).json({ error: "User not found" });

    // ✅ Extract page, limit, and status from query
    let { page = 1, limit = 6, status } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    // ✅ Build filter query
    const filter = { owner: userId };
    if (status && status !== "All") filter.status = status;

    const totalShipments = await Shipment.countDocuments(filter);

    const shipments = await Shipment.find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.json({
      shipments,
      username: username.username,
      currentPage: page,
      totalPages: Math.ceil(totalShipments / limit),
      totalItems: totalShipments,
    });
  } catch (err) {
    console.error(err);
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

    res.status(200).json(shipment);
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
    res.status(200).json({ message: "Shipment deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: "Failed to delete shipment" });
  }
};