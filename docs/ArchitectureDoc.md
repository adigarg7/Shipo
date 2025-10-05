Layer	Technology


Frontend	Next.js, React, Tailwind CSS
Backend	Node.js, Express.js, JWT, bcrypt
Database	MongoDB
Deployment	Vercel (Frontend), Render (Backend)


SCHEMA FOR USERS
username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  ships: { type: [mongoose.Schema.Types.ObjectId], ref: "Shipment" }

  SCHEMA FOR SHIPMENT

  description: { type: String, required: true },
  status: { type: String, enum: ["Pending", "Shipped", "Delivered", "Cancelled"], default: "Pending" },
  isFragile: { type: Boolean, default: false },
  weight: { type: Number, required: true },
  distance: { type: Number, required: true },
  shippingCost: { type: Number, default: 0 } , 
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }



Security & Auth

JWT-based authentication.

Passwords hashed with bcrypt.

HTTP-only cookies for session management.