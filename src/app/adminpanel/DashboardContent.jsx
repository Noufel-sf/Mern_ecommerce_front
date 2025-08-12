import React from "react";
import { BarChart3, Plus, Settings } from "lucide-react";
import { Users, BaggageClaim, PackageIcon } from "lucide-react";
import { useState } from "react";


const StatCard = ({ stat }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-600">{stat.title}</p>
        <p className="text-2xl font-bold text-green-500">{stat.value}</p>
      </div>
   
    </div>
  </div>
);

const DashboardContent = ({Orderscount ,productscount ,Revenue}) => (
  <div className="space-y-6">
    <div>
      <h1 className="text-5xl font-extrabold text-[var(--primary)]">Dashboard</h1>
      <p className="mt-12 font-bold">Welcome back! Here's what's happening.</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard key={0} stat={{ title: "Orders", value: Orderscount, color: "orange" }} />
      <StatCard key={1} stat={{ title: "Total Products", value: productscount, color: "blue" }} />
      <StatCard key={2} stat={{ title: "Revenue", value: Revenue, color: "green" }} />
    </div>

  
  </div>
);

export default DashboardContent;
