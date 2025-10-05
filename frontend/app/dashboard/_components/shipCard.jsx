import React, { useState } from 'react';
import { Trash2, Edit2, PackageCheck } from 'lucide-react';
import { UpdateProjectModal } from './update-project-model';
export const ShipCard = ({ shipment, onDelete }) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState('');

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'shipped':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'delivered':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'cancelled':
                return 'bg-red-100 text-red-800 border-red-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const handleDelete = async () => {
        const confirmed = window.confirm("Are you sure you want to delete this shipment?");
        if (!confirmed) return;

        setIsDeleting(true);
        setDeleteError('');

        try {
            const response = await fetch(
                `http://localhost:3000/api/shipments/delete/${shipment._id}`,
                {
                    method: 'DELETE',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            // Check if response is ok (status 200-299)
            if (response.ok) {
                // Call onDelete to update parent state
                onDelete(shipment._id);
 
            } else {
                // Try to get error message from response
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || 'Failed to delete shipment');
            }
        } catch (error) {
            setDeleteError(error.message || 'Error deleting shipment');
            console.error('Delete error:', error);
        } finally {
            setIsDeleting(false);
        }
    };

    const [isEditing, setIsEditing] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const handleEdit = () => {
        setShowUpdateModal(true);
    }
    const calculateShippingCost = () => {
        const baseRate = 0.5; // $0.5 per kg per km
        return (shipment.weight * shipment.distance * baseRate).toFixed(2);
    };

    return (
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg border border-gray-700 p-6 transition-all duration-300 hover:shadow-xl hover:border-gray-600">
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
                <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(shipment.status)}`}>
                    {shipment.status}
                </div>
                <div className="flex space-x-2">
                    <button 
                        onClick={handleEdit}
                        disabled={isEditing}
                        className="p-2 text-gray-400 hover:text-blue-400 transition-colors"
                        title="Edit shipment"
                    >
                        <Edit2 size={16} />
                    </button>
                    <button 
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className={`p-2 transition-colors ${
                            isDeleting 
                                ? 'text-gray-600 cursor-not-allowed' 
                                : 'text-gray-400 hover:text-red-400'
                        }`}
                        title="Delete shipment"
                    >
                        {isDeleting ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-400 border-t-transparent"></div>
                        ) : (
                            <Trash2 size={16} />
                        )}
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="space-y-4">
                <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                        {shipment.description}
                    </h3>
                    <div className="flex items-center text-sm text-gray-400">
                        <PackageCheck size={16} className="mr-2" />
                        <span>{shipment.isFragile ? 'Fragile Item' : 'Regular Item'}</span>
                    </div>
                </div>

                {/* Shipping Details */}
                <div className="grid grid-cols-2 gap-4 py-3 border-t border-b border-gray-700">
                    <div>
                        <p className="text-sm text-gray-500">Weight</p>
                        <p className="text-lg font-semibold text-white">{shipment.weight} kg</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Distance</p>
                        <p className="text-lg font-semibold text-white">{shipment.distance} km</p>
                    </div>
                </div>

                {/* Shipping Cost */}
                <div className="bg-blue-900/30 rounded-lg p-4 border border-blue-800/30">
                    <p className="text-sm text-blue-400 mb-1">Estimated Cost</p>
                    <p className="text-2xl font-bold text-blue-300">
                        ₹{calculateShippingCost()}
                    </p>
                </div>

                {/* Timestamps */}
                <div className="text-xs text-gray-500 pt-2">
                    Created: {new Date(shipment.createdAt).toLocaleDateString()}
                    {shipment.updatedAt && shipment.updatedAt !== shipment.createdAt && (
                        <span className="ml-2">
                            · Updated: {new Date(shipment.updatedAt).toLocaleDateString()}
                        </span>
                    )}
                </div>
            </div>

            {/* Error Message */}
            {deleteError && (
                <div className="mt-4 p-3 bg-red-900/30 border border-red-800 rounded-lg text-sm text-red-400">
                    {deleteError}
                </div>
            )}
            <UpdateProjectModal
                shipment={shipment}
                isOpen={showUpdateModal}
                onClose={() => setShowUpdateModal(false)}
            />
        </div>
    );
};

export default ShipCard;



