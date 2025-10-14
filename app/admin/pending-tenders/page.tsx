"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminAxios } from "@/lib/admin-api";
import AdminLayout from "@/components/admin/AdminLayout";
import ProtectedAdminRoute from "@/components/admin/ProtectedAdminRoute";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
  CheckCircle,
  XCircle,
  Eye,
  Calendar,
  MapPin,
  Building,
  Tag,
  Clock,
  FileText,
  Mail,
  DollarSign,
  AlertCircle,
} from "lucide-react";

interface Tender {
  _id: string;
  title: string;
  organization?: string;
  location: string;
  status: string;
  category?: string;
  budget?: string;
  contactEmail?: string;
  publishedAt?: string;
  submittedBy?: string;
  [key: string]: any;
}

function RejectModal({ onConfirm, onCancel, tenderTitle }: { onConfirm: (reason: string) => void; onCancel: () => void; tenderTitle: string }) {
  const [reason, setReason] = useState("");

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mx-auto mb-4">
          <XCircle className="w-6 h-6 text-red-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">Reject Tender</h3>
        <p className="text-gray-600 text-center mb-4">Please provide a reason for rejecting &quot;{tenderTitle}&quot;</p>
        <textarea value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Enter rejection reason..." className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none" rows={4} autoFocus />
        <div className="flex gap-3 mt-4">
          <button className="flex-1 bg-gray-100 text-gray-700 px-4 py-2.5 rounded-lg font-medium hover:bg-gray-200 transition-colors" onClick={onCancel}>Cancel</button>
          <button className="flex-1 bg-red-600 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-red-700 transition-colors disabled:opacity-50" onClick={() => onConfirm(reason)} disabled={!reason.trim()}>Reject</button>
        </div>
      </div>
    </div>
  );
}

export default function PendingTendersPage() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [rejectingTender, setRejectingTender] = useState<Tender | null>(null);

  const { data: pendingTenders, isLoading, error } = useQuery({
    queryKey: ["pending-tenders"],
    queryFn: async () => {
      const res = await adminAxios.get("/tenders/admin/pending");
      return res.data.tenders;
    },
  });

  const approveMutation = useMutation({
    mutationFn: (tenderId: string) => adminAxios.put(`/tenders/admin/${tenderId}/approve`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pending-tenders"] });
      queryClient.invalidateQueries({ queryKey: ["approved-tenders"] });
      toast.success("Tender approved successfully");
    },
    onError: (error: any) => {
      if (error.response?.status === 401) {
        toast.error("Session expired. Please login again.");
      } else {
        toast.error(error.response?.data?.message || "Failed to approve tender");
      }
    },
  });

  const rejectMutation = useMutation({
    mutationFn: ({ tenderId, reason }: { tenderId: string; reason: string }) => adminAxios.put(`/tenders/admin/${tenderId}/reject`, { rejectionReason: reason }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pending-tenders"] });
      queryClient.invalidateQueries({ queryKey: ["approved-tenders"] });
      toast.success("Tender rejected successfully");
    },
    onError: (error: any) => {
      if (error.response?.status === 401) {
        toast.error("Session expired. Please login again.");
      } else {
        toast.error(error.response?.data?.message || "Failed to reject tender");
      }
    },
  });

  const handleApprove = (tenderId: string) => {
    approveMutation.mutate(tenderId);
  };

  const handleReject = (tender: Tender) => {
    setRejectingTender(tender);
  };

  const confirmReject = (reason: string) => {
    if (reason.trim() && rejectingTender) {
      rejectMutation.mutate(
        { tenderId: rejectingTender._id, reason },
        {
          onSuccess: () => { setRejectingTender(null); },
          onError: () => { setRejectingTender(null); },
        }
      );
    }
  };

  if (isLoading) {
    return (
      <ProtectedAdminRoute><AdminLayout><div className="p-6"><div className="animate-pulse"><div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{[...Array(6)].map((_, i) => (<div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"><div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div><div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div><div className="h-3 bg-gray-200 rounded w-2/3"></div></div>))}</div></div></div></AdminLayout></ProtectedAdminRoute>
    );
  }

  if (error) {
    return (
      <ProtectedAdminRoute><AdminLayout><div className="p-6"><div className="text-center py-12"><div className="text-red-500 text-lg mb-2">Error loading pending tenders</div><button onClick={() => window.location.reload()} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">Try Again</button></div></div></AdminLayout></ProtectedAdminRoute>
    );
  }

  return (
    <ProtectedAdminRoute><AdminLayout><div className="p-6"><div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"><div><h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Pending Tenders</h1><p className="text-gray-600 mt-1">Review and approve tender submissions</p></div><div className="flex items-center gap-2"><AlertCircle className="w-5 h-5 text-yellow-600" /><span className="text-sm text-gray-600">{pendingTenders?.length || 0} tenders pending review</span></div></div><div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6"><div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4"><div className="flex items-center justify-between"><div><p className="text-sm font-medium text-gray-600">Pending Tenders</p><p className="text-2xl font-bold text-yellow-600">{pendingTenders?.length || 0}</p></div><div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center"><Clock className="w-6 h-6 text-yellow-600" /></div></div></div><div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4"><div className="flex items-center justify-between"><div><p className="text-sm font-medium text-gray-600">Ready to Review</p><p className="text-2xl font-bold text-blue-600">{pendingTenders?.length || 0}</p></div><div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center"><FileText className="w-6 h-6 text-blue-600" /></div></div></div><div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4"><div className="flex items-center justify-between"><div><p className="text-sm font-medium text-gray-600">Action Required</p><p className="text-2xl font-bold text-red-600">{pendingTenders?.length || 0}</p></div><div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center"><AlertCircle className="w-6 h-6 text-red-600" /></div></div></div></div><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{pendingTenders?.map((tender: Tender) => (<div key={tender._id} className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"><div className="p-6"><div className="flex items-start justify-between mb-4"><div className="flex-1"><h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">{tender.title}</h3><div className="flex items-center text-sm text-gray-600 mb-2"><Building className="w-4 h-4 mr-1" />{tender.organization || "Confidential"}</div></div><div className="flex items-center gap-1"><span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"><Clock className="w-3 h-3 mr-1" />Pending</span></div></div><div className="space-y-2 mb-4"><div className="flex items-center text-sm text-gray-600"><MapPin className="w-4 h-4 mr-2" />{tender.location}</div>{tender.category && <div className="flex items-center text-sm text-gray-600"><Tag className="w-4 h-4 mr-2" />{tender.category}</div>}{tender.budget && <div className="flex items-center text-sm text-gray-600"><DollarSign className="w-4 h-4 mr-2" />{tender.budget}</div>}{tender.contactEmail && <div className="flex items-center text-sm text-gray-600"><Mail className="w-4 h-4 mr-2" />{tender.contactEmail}</div>}<div className="flex items-center text-sm text-gray-600"><Calendar className="w-4 h-4 mr-2" />{tender.publishedAt ? new Date(tender.publishedAt).toLocaleDateString() : "N/A"}</div>{tender.submittedBy && <div className="flex items-center text-sm text-gray-600"><span className="text-xs bg-gray-100 px-2 py-1 rounded">Submitted by: {tender.submittedBy}</span></div>}</div><div className="flex gap-2"><button className="flex items-center justify-center flex-1 bg-green-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors" onClick={() => handleApprove(tender._id)} disabled={approveMutation.isPending}><CheckCircle className="w-4 h-4 mr-1" />Approve</button><button className="flex items-center justify-center flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors" onClick={() => router.push(`/admin/tenders/${tender._id}`)}><Eye className="w-4 h-4 mr-1" />View</button><button className="flex items-center justify-center flex-1 bg-red-100 text-red-600 px-3 py-2 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors" onClick={() => handleReject(tender)} disabled={rejectMutation.isPending}><XCircle className="w-4 h-4 mr-1" />Reject</button></div></div></div>))}</div>{pendingTenders?.length === 0 && <div className="text-center py-12"><CheckCircle className="w-16 h-16 text-green-300 mx-auto mb-4" /><h3 className="text-lg font-medium text-gray-900 mb-2">No pending tenders</h3><p className="text-gray-600 mb-6">All tender submissions have been reviewed and processed.</p><button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors" onClick={() => router.push("/admin/tenders")}>View All Tenders</button></div>}</div>{rejectingTender && <RejectModal tenderTitle={rejectingTender.title} onConfirm={confirmReject} onCancel={() => setRejectingTender(null)} />}</AdminLayout></ProtectedAdminRoute>
  );
}


