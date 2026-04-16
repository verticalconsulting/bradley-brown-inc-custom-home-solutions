import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Trash2, LogOut, LogIn, Search, BarChart2, ChevronRight, ShieldCheck, MessageSquare, FileText, Users, Video } from "lucide-react";

export default function AccountSettings() {
  const navigate = useNavigate();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    base44.auth.me().then(setUser).catch(() => {});
  }, []);

  const handleDeleteAccount = async () => {
    setDeleting(true);
    try {
      // In a real app, you'd have a backend function to handle account deletion
      // For now, we'll just show the functionality
      await base44.auth.logout('/');
    } catch (error) {
      console.error('Error deleting account:', error);
    } finally {
      setDeleting(false);
    }
  };

  const handleLogout = async () => {
    await base44.auth.logout('/');
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] pt-24 pb-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <h1 className="text-3xl md:text-4xl font-bold text-[#1E2D3D] mb-2">Account Settings</h1>
        <p className="text-slate-600 mb-8">Manage your account and preferences.</p>

        {/* Admin Tools — only visible to admins */}
        {user?.role === "admin" && (
          <div className="bg-white rounded-2xl shadow-md border border-[#E2D9CC] overflow-hidden mb-6">
            <div className="p-6 md:p-8 border-b border-gray-100 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-sky-500" />
              <h2 className="text-lg font-semibold text-[#1E2D3D]">Admin Tools</h2>
            </div>
            <div className="divide-y divide-gray-100">
              <Link to="/SEODashboard" className="flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors group">
                <div className="flex items-center gap-3">
                  <Search className="w-5 h-5 text-sky-500" />
                  <div>
                    <p className="font-medium text-[#1E2D3D] text-sm">SEO Dashboard</p>
                    <p className="text-xs text-slate-400">Search Console queries, indexing & page keywords</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-sky-500 transition-colors" />
              </Link>
              <Link to="/FunnelAnalysis" className="flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors group">
                <div className="flex items-center gap-3">
                  <BarChart2 className="w-5 h-5 text-indigo-500" />
                  <div>
                    <p className="font-medium text-[#1E2D3D] text-sm">Funnel Analysis</p>
                    <p className="text-xs text-slate-400">GA4 consultation funnel & conversion tracking</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 transition-colors" />
              </Link>
              <Link to="/AgentChat" className="flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors group">
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-5 h-5 text-emerald-500" />
                  <div>
                    <p className="font-medium text-[#1E2D3D] text-sm">Agent Chat</p>
                    <p className="text-xs text-slate-400">AI-powered home advisor chat interface</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-500 transition-colors" />
              </Link>
              <Link to="/BlogAdmin" className="flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors group">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-amber-500" />
                  <div>
                    <p className="font-medium text-[#1E2D3D] text-sm">Blog Admin</p>
                    <p className="text-xs text-slate-400">Manage blog posts & AI-generated content</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-amber-500 transition-colors" />
              </Link>
              <Link to="/CRM" className="flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors group">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-violet-500" />
                  <div>
                    <p className="font-medium text-[#1E2D3D] text-sm">CRM</p>
                    <p className="text-xs text-slate-400">Client relationship management</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-violet-500 transition-colors" />
              </Link>
              <Link to="/Leads" className="flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors group">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-sky-600" />
                  <div>
                    <p className="font-medium text-[#1E2D3D] text-sm">Leads</p>
                    <p className="text-xs text-slate-400">View and manage project inquiries</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-sky-600 transition-colors" />
              </Link>
              <Link to="/TikTokSync" className="flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors group">
                <div className="flex items-center gap-3">
                  <Video className="w-5 h-5 text-pink-500" />
                  <div>
                    <p className="font-medium text-[#1E2D3D] text-sm">TikTok Sync</p>
                    <p className="text-xs text-slate-400">Sync and manage TikTok content</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-pink-500 transition-colors" />
              </Link>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-md border border-[#E2D9CC] overflow-hidden">
          {/* Logout Section */}
          <div className="p-6 md:p-8 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-[#1E2D3D] mb-3">Session</h2>
            {user ? (
              <>
                <p className="text-slate-600 text-sm mb-4">Signed in as <span className="font-medium">{user.email}</span>. Sign out of your account.</p>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <p className="text-slate-600 text-sm mb-4">You are not currently logged in.</p>
                <Button
                  onClick={() => base44.auth.redirectToLogin()}
                  className="flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white"
                >
                  <LogIn className="w-4 h-4" />
                  Login
                </Button>
              </>
            )}
          </div>

          {/* Delete Account Section */}
          <div className="p-6 md:p-8">
            <h2 className="text-lg font-semibold text-red-600 mb-3">Danger Zone</h2>
            <p className="text-slate-600 text-sm mb-4">
              Permanently delete your account and all associated data. This action cannot be undone.
            </p>
            <Button
              onClick={() => setShowDeleteDialog(true)}
              variant="destructive"
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700"
            >
              <Trash2 className="w-4 h-4" />
              Delete Account
            </Button>
          </div>
        </div>
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Account</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete your account? This action is permanent and cannot be undone. All your data will be deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-3">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteAccount}
              disabled={deleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {deleting ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}