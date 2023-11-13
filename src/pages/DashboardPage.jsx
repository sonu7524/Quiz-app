
import Dashboard from "../components/Dashboard";
import Header from "../components/common/Header";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function DashboardPage() {
    return (
        <div>
            <Header />
            <Dashboard />
        </div>
    )
}