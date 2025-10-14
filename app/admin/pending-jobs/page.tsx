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

interface Job {
  _id: string;
  title: string;
  organization?: string;
  location: string;
  status: string;
  category?: string;
  salary?: string;
  contactEmail?: string;
  publishedAt?: string;
  submittedBy?: string;
  [key: string]: any;
}

function RejectModal({
  onConfirm,
  onCancel,
  jobTitle,
}: {
  onConfirm: (reason: string) => void;
  onCancel: () => void;
  jobTitle: string;
}) {
  const [reason, setReason] = useState("");

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mx-auto mb-4">
          <XCircle className="w-6 h-6 text-red-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
          Reject Job
        </h3>
        <p className="text-gray-600 text-center mb-4">
          Please provide a reason for rejecting &quot;{jobTitle}&quot;
        </p>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Enter rejection reason..."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
          rows={4}
          autoFocus
        />
        <div className="flex gap-3 mt-4">
          <button
            className="flex-1 bg-gray-100 text-gray-700 px-4 py-2.5 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="flex-1 bg-red-600 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-red-700 transition-colors disabled:opacity-50"
            onClick={() => onConfirm(reason)}
            disabled={!reason.trim()}
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PendingJobsPage() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [rejectingJob, setRejectingJob] = useState<Job | null>(null);

  const {
    data: pendingJobs,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["pending-jobs"],
    queryFn: async () => {
      const res = await adminAxios.get("/jobs/admin/pending");
      return res.data.jobs;
    },
  });

  const approveMutation = useMutation({
    mutationFn: (jobId: string) => adminAxios.put(`/jobs/admin/${jobId}/approve`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pending-jobs"] });
      queryClient.invalidateQueries({ queryKey: ["approved-jobs"] });
      toast.success("Job approved successfully");
    },
    onError: (error: any) => {
      if (error.response?.status === 401) {
        toast.error("Session expired. Please login again.");
      } else {
        toast.error(error.response?.data?.message || "Failed to approve job");
      }
    },
  });

  const rejectMutation = useMutation({
    mutationFn: ({ jobId, reason }: { jobId: string; reason: string }) =>
      adminAxios.put(`/jobs/admin/${jobId}/reject`, { rejectionReason: reason }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pending-jobs"] });
      queryClient.invalidateQueries({ queryKey: ["approved-jobs"] });
      toast.success("Job rejected successfully");
    },
    onError: (error: any) => {
      if (error.response?.status === 401) {
        toast.error("Session expired. Please login again.");
      } else {
        toast.error(error.response?.data?.message || "Failed to reject job");
      }
    },
  });

  const handleApprove = (jobId: string) => {
    approveMutation.mutate(jobId);
  };

  const handleReject = (job: Job) => {
    setRejectingJob(job);
  };

  const confirmReject = (reason: string) => {
    if (reason.trim() && rejectingJob) {
      rejectMutation.mutate(
        { jobId: rejectingJob._id, reason },
        {
          onSuccess: () => {
            setRejectingJob(null);
          },
          onError: () => {
            setRejectingJob(null);
          },
        }
      );
    }
  };

  if (isLoading) {
    return (
      <ProtectedAdminRoute>
        <AdminLayout>
          <div className="p-6">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
                  >
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AdminLayout>
      </ProtectedAdminRoute>
    );
  }

  if (error) {
    return (
      <ProtectedAdminRoute>
        <AdminLayout>
          <div className="p-6">
            <div className="text-center py-12">
              <div className="text-red-500 text-lg mb-2">
                Error loading pending jobs
              </div>
              <button
                onClick={() => window.location.reload()}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </AdminLayout>
      </ProtectedAdminRoute>
    );
  }

  return (
    <ProtectedAdminRoute>
      <AdminLayout>
        <div className="p-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Pending Jobs
              </h1>
              <p className="text-gray-600 mt-1">
                Review and approve job submissions
              </p>
            </div>
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-yellow-600" />
              <span className="text-sm text-gray-600">
                {pendingJobs?.length || 0} jobs pending review
              </span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Pending Jobs
                  </p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {pendingJobs?.length || 0}
                  </p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Ready to Review
                  </p>
                  <p className="text-2xl font-bold text-blue-600">
                    {pendingJobs?.length || 0}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Action Required
                  </p>
                  <p className="text-2xl font-bold text-red-600">
                    {pendingJobs?.length || 0}
                  </p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Pending Jobs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pendingJobs?.map((job: Job) => (
              <div
                key={job._id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                        {job.title}
                      </h3>
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <Building className="w-4 h-4 mr-1" />
                        {job.organization || "Confidential"}
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        <Clock className="w-3 h-3 mr-1" />
                        Pending
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      {job.location}
                    </div>
                    {job.category && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Tag className="w-4 h-4 mr-2" />
                        {job.category}
                      </div>
                    )}
                    {job.salary && (
                      <div className="flex items-center text-sm text-gray-600">
                        <DollarSign className="w-4 h-4 mr-2" />
                        {job.salary}
                      </div>
                    )}
                    {job.contactEmail && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail className="w-4 h-4 mr-2" />
                        {job.contactEmail}
                      </div>
                    )}
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      {job.publishedAt
                        ? new Date(job.publishedAt).toLocaleDateString()
                        : "N/A"}
                    </div>
                    {job.submittedBy && (
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                          Submitted by: {job.submittedBy}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <button
                      className="flex items-center justify-center flex-1 bg-green-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                      onClick={() => handleApprove(job._id)}
                      disabled={approveMutation.isPending}
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Approve
                    </button>
                    <button
                      className="flex items-center justify-center flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                      onClick={() => router.push(`/admin/jobs/${job._id}`)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </button>
                    <button
                      className="flex items-center justify-center flex-1 bg-red-100 text-red-600 px-3 py-2 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors"
                      onClick={() => handleReject(job)}
                      disabled={rejectMutation.isPending}
                    >
                      <XCircle className="w-4 h-4 mr-1" />
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {pendingJobs?.length === 0 && (
            <div className="text-center py-12">
              <CheckCircle className="w-16 h-16 text-green-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No pending jobs
              </h3>
              <p className="text-gray-600 mb-6">
                All job submissions have been reviewed and processed.
              </p>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                onClick={() => router.push("/admin/jobs")}
              >
                View All Jobs
              </button>
            </div>
          )}
        </div>

        {/* Reject Modal */}
        {rejectingJob && (
          <RejectModal
            jobTitle={rejectingJob.title}
            onConfirm={confirmReject}
            onCancel={() => setRejectingJob(null)}
          />
        )}
      </AdminLayout>
    </ProtectedAdminRoute>
  );
}


