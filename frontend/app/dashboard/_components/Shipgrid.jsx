import React from 'react'

const Shipgrid = ({ shipments }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {shipments.map((shipment) => (
        <div key={shipment.id} className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <h3 className="text-blue-400 text-sm font-medium">
            {shipment.title}
          </h3>
          <p className="text-3xl font-bold text-white mt-2">
            {shipment.status}
          </p>
        </div>
      ))}
    </div>
  )
}

export default Shipgrid