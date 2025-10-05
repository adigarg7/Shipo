import React, { useState } from 'react';
import { ShipCard } from './shipCard';

export const Shipgrid = ({ shipments: initialShipments }) => {
    const [shipments, setShipments] = useState(initialShipments);
    const [error, setError] = useState('');

    // const handleEdit = async (id, updatedData) => {
    //     try {
    //         const response = await fetch(`http://localhost:3000/api/shipments/update/${id}`, {
    //             method: 'PUT',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             credentials: 'include',
    //             body: JSON.stringify(updatedData)
    //         });

    //         if (!response.ok) {
    //             const errorData = await response.json();
    //             throw new Error(errorData.message || 'Failed to update shipment');
    //         }

    //         const updatedShipment = await response.json();

    //         // Update the local state with the edited shipment
    //         setShipments(prevShipments =>
    //             prevShipments.map(shipment =>
    //                 shipment._id === id ? updatedShipment : shipment
    //             )
    //         );

    //         setError('');
    //     } catch (err) {
    //         setError(err.message || 'Error updating shipment');
    //         console.error('Error updating shipment:', err);
    //     }
    // };

    const handleDeleteShipment = (shipmentId) => {
        setShipments(prevShipments => 
        prevShipments.filter(shipment => shipment._id !== shipmentId)
        
     );
     window.location.reload();
  };


    return (
        <>
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {shipments.map((shipment) => (
                    <ShipCard
                        key={shipment._id}
                        shipment={shipment}
                        onDelete={handleDeleteShipment}
                    />
                ))}
            </div>
        </>
    );
};