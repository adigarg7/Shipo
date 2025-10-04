import mongoose from "mongoose";

const shipmentSchema = new mongoose.Schema({
  // shipmentId: { type: String, required: true , unique: true},
  description: { type: String, required: true },
  status: { type: String, enum: ["Pending", "Shipped", "Delivered", "Cancelled"], default: "Pending" },
  isFragile: { type: Boolean, default: false },
  weight: { type: Number, required: true },
  distance: { type: Number, required: true },
  shippingCost: { type: Number, default: 0 } , 
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });

shipmentSchema.pre("save", function(next) {
  this.shippingCost = this.weight * this.distance;
  next();
});

export default mongoose.model("Shipment", shipmentSchema);
