"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus, LogOut } from "lucide-react"; // Added LogOut icon
import { NewProjectModal } from "./_components/new-project-model";
import { Shipgrid } from "./_components/Shipgrid";

const DashboardPage = () => {
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState("All");
  const limit = 8;
  const router = useRouter();

  // --- LOGOUT FUNCTION ---
  const handleLogout = async () => {
    try {
      // Call backend logout API if you have one
      await fetch("http://localhost:4000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      // Redirect to signin page
      router.push("/signin");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };
  // -----------------------

  const fetchShipments = async (page = 1, status = "All") => {
    setLoading(true);
    try {
      const query = `page=${page}&limit=${limit}${
        status && status !== "All" ? `&status=${status}` : ""
      }`;

      const response = await fetch(
        `http://localhost:4000/api/shipments/read?${query}`,
        {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setShipments(data.shipments || []);
        setTotalPages(data.totalPages || 1);
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
    fetchShipments(page, statusFilter);
  }, [page, statusFilter]);

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
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12">
          <div className="mb-6 md:mb-0">
            <h1 className="text-4xl font-bold text-white mb-2">
              Shipment Dashboard
            </h1>
            <p className="text-gray-400">
              Manage and track your shipments efficiently
            </p>
          </div>

          <div className="flex gap-4">
            <Button
              onClick={() => setShowNewProjectModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center gap-2"
            >
              <Plus className="h-5 w-5" />
              New Shipment
            </Button>

            {/* Logout Button */}
            <Button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-all duration-200 flex items-center gap-2"
            >
              <LogOut className="h-5 w-5" />
              Logout
            </Button>
          </div>
        </div>

        {/* Filter Section */}
        <div className="flex flex-wrap items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <label className="text-gray-300 font-medium">Filter by Status:</label>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1); // reset to first page when filter changes
              }}
              className="bg-gray-800 text-white border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All</option>
              <option value="Pending">Pending</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
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
            <h3 className="text-xl font-medium text-white mb-2">
              No shipments found
            </h3>
            <p className="text-gray-400 mb-6">
              Try changing your filter or create a new shipment.
            </p>
            <Button
              onClick={() => setShowNewProjectModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-all duration-200"
            >
              Create Shipment
            </Button>
          </div>
        ) : (
          <>
            <Shipgrid shipments={shipments} />

            {/* Pagination Controls */}
            <div className="flex justify-center items-center gap-4 mt-10">
              <Button
                disabled={page === 1}
                onClick={() => setPage((prev) => prev - 1)}
                className={`px-6 py-2 ${
                  page === 1
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                } text-white rounded-lg transition-all duration-200`}
              >
                Previous
              </Button>

              <span className="text-white text-lg font-medium">
                Page {page} of {totalPages}
              </span>

              <Button
                disabled={page === totalPages}
                onClick={() => setPage((prev) => prev + 1)}
                className={`px-6 py-2 ${
                  page === totalPages
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                } text-white rounded-lg transition-all duration-200`}
              >
                Next
              </Button>
            </div>
          </>
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
