import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export const UpdateProjectModal = ({ shipment, isOpen, onClose, onUpdate }) => {
    const [formData, setFormData] = useState({
        description: '',
        status: 'Pending' 
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Populate form with existing shipment data when modal opens
    useEffect(() => {
        if (shipment && isOpen) {
            setFormData({
                description: shipment.description || '',
                status: shipment.status || 'Pending'
            });
        }
    }, [shipment, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value  // This was the missing piece!
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch(`http://localhost:3000/api/shipments/update/${shipment._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    newdescription: formData.description,
                    newstatus: formData.status,
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update shipment');
            }

            const updatedShipment = await response.json();
            
            // Call onUpdate callback if provided (better than page reload)
            if (onUpdate) {
                onUpdate(updatedShipment);
            }
            
            // Reset form and close modal
            setFormData({
                description: '',
                status: 'Pending',
            });
            onClose();
            
            // Only reload if no onUpdate callback
            if (!onUpdate) {
                window.location.reload();
            }

        } catch (err) {
            setError(err.message || 'Error updating shipment');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-lg w-full max-w-md p-6 relative border border-gray-700">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 transition-colors"
                >
                    <X size={24} />
                </button>

                <h2 className="text-2xl font-bold text-white mb-6">Update Shipment</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                            Description
                        </label>
                        <input
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter shipment description"
                            required
                        />
                    </div>

                    {/* Status */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                            Status
                        </label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="Pending">Pending</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="bg-red-900/30 border border-red-800 text-red-400 p-3 rounded-md text-sm">
                            {error}
                        </div>
                    )}

                    {/* Submit Buttons */}
                    <div className="flex gap-3 pt-2">
                        <button
                            type="submit"
                            disabled={loading}
                            className={`flex-1 py-2 px-4 rounded-md text-white font-medium transition-colors ${
                                loading
                                    ? 'bg-blue-500 cursor-not-allowed opacity-50'
                                    : 'bg-blue-600 hover:bg-blue-700'
                            }`}
                        >
                            {loading ? 'Updating...' : 'Update Shipment'}
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            className="px-4 py-2 bg-gray-700 text-gray-300 rounded-md hover:bg-gray-600 transition-colors disabled:opacity-50"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateProjectModal;