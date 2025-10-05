"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { NewProjectModal } from "./_components/new-project-model";
import { Shipgrid } from "./_components/Shipgrid";

const DashboardPage = () => {
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  const fetchShipments = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/shipments/read", {
        method: "GET",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (response.ok) {
        const data = await response.json();
        setShipments(data.shipments || []);
        setError("");
      } else if (response.status === 401) {
        router.push("/signin");
      } else {
        setError("Failed to fetch shipments");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShipments();
  },[]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12">
          <div className="mb-6 md:mb-0">
            <h1 className="text-4xl font-bold text-white mb-2">
              Shipment Dashboard
            </h1>
            <p className="text-gray-400">
              Manage and track your shipments efficiently
            </p>
          </div>

          <Button
            onClick={() => setShowNewProjectModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center gap-2"
          >
            <Plus className="h-5 w-5" />
            New Shipment
          </Button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg mb-8">
            {error}
          </div>
        )}

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-12">
          {[
            { title: "Total Shipments", count: shipments.length, color: "blue" },
            { title: "Pending", count: shipments.filter(s => s.status === "Pending").length, color: "yellow" },
            { title: "Shipped", count: shipments.filter(s => s.status === "Shipped").length, color: "purple" },
            { title: "Delivered", count: shipments.filter(s => s.status === "Delivered").length, color: "green" },
            { title: "Cancelled", count: shipments.filter(s => s.status === "Cancelled").length, color: "red" }
          ].map((stat, index) => (
            <div key={index} className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <h3 className={`text-${stat.color}-400 text-sm font-medium`}>
                {stat.title}
              </h3>
              <p className="text-3xl font-bold text-white mt-2">
                {stat.count}
              </p>
            </div>
          ))}
        </div>

        {/* Shipments Grid */}
        {shipments.length === 0 ? (
          <div className="text-center py-16 bg-gray-800/30 rounded-2xl border-2 border-dashed border-gray-700">
            <div className="w-16 h-16 mx-auto mb-4 text-gray-600">
              <Plus className="w-full h-full" />
            </div>
            <h3 className="text-xl font-medium text-white mb-2">No shipments yet</h3>
            <p className="text-gray-400 mb-6">Create your first shipment to get started</p>
            <Button
              onClick={() => setShowNewProjectModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-all duration-200"
            >
              Create Shipment
            </Button>
          </div>
        ) : (
          <Shipgrid shipments={shipments} />
        )}
      </div>

      <NewProjectModal
        isOpen={showNewProjectModal}
        onClose={() => setShowNewProjectModal(false)}
      />
    </div>
  );
};

export default DashboardPage;