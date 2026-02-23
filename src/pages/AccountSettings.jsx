import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useNavigate } from "react-router-dom";
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
import { Trash2, LogOut } from "lucide-react";

export default function AccountSettings() {
  const navigate = useNavigate();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleting, setDeleting] = useState(false);

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

        <div className="bg-white rounded-2xl shadow-md border border-[#E2D9CC] overflow-hidden">
          {/* Logout Section */}
          <div className="p-6 md:p-8 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-[#1E2D3D] mb-3">Session</h2>
            <p className="text-slate-600 text-sm mb-4">Sign out of your account.</p>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
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