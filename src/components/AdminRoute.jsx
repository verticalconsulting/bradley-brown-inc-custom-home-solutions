import React from "react";
import { Helmet } from "react-helmet-async";
import { useAuth } from "@/lib/AuthContext";
import { base44 } from "@/api/base44Client";
import { Lock } from "lucide-react";

export default function AdminRoute({ children }) {
  const { user, isAuthenticated, isLoadingAuth } = useAuth();

  if (isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated || user?.role !== "admin") {
    return (
      <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center pt-20 px-4">
        <div className="bg-white rounded-2xl shadow-md border border-[#E2D9CC] p-8 md:p-12 max-w-sm w-full text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#1E2D3D]/10 rounded-full mb-5">
            <Lock className="w-7 h-7 text-[#1E2D3D]" />
          </div>
          <h2 className="text-xl font-bold text-[#1E2D3D] mb-2">Admin Access Required</h2>
          <p className="text-slate-500 text-sm mb-6">
            This section is restricted to administrators. Please log in with your admin account.
          </p>
          <button
            onClick={() => base44.auth.redirectToLogin(window.location.href)}
            className="w-full bg-[#1E2D3D] hover:bg-[#2C3E50] text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Log In as Admin
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      {children}
    </>
  );
}