"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { adminAxios } from "@/lib/admin-api";
import AdminLayout from "@/components/admin/AdminLayout";
import ProtectedAdminRoute from "@/components/admin/ProtectedAdminRoute";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Building,
  Mail,
  Tag,
  FileText,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
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
  deadline?: string;
  description: string;
  instructions?: string;
  submittedBy?: string;
  submittedAt?: string;
  approvedBy?: string;
  approvedAt?: string;
  rejectionReason?: string;
  documents?: string[];
  [key: string]: any;
}

export default function JobDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const {
    data: job,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["job", id],
    queryFn: async () => {
      const res = await adminAxios.get(`/jobs/${id}`);
      return res.data as Job;
    },
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "rejected":
        return <XCircle className="w-5 h-5 text-red-600" />;
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-600" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (isLoading) {
    return (
      <ProtectedAdminRoute>
        <AdminLayout>
          <div className="p-6">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3 mb-6"></div>
                <div className="space-y-3">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-16 bg-gray-200 rounded"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </AdminLayout>
      </ProtectedAdminRoute>
    );
  }

  if (error || !job) {
    return (
      <ProtectedAdminRoute>
        <AdminLayout>
          <div className="p-6">
            <div className="text-center py-12">
              <AlertCircle className="w-16 h-16 text-red-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {error ? "Error loading job" : "Job not found"}
              </h3>
              <p className="text-gray-600 mb-6">
                {error
                  ? "There was an error loading the job details."
                  : "The job you're looking for doesn't exist."}
              </p>
              <button
                onClick={() => router.push("/admin/jobs")}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Back to Jobs
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
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push("/admin/jobs")}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Job Details
                </h1>
                <p className="text-gray-600">
                  View and manage job information
                </p>
              </div>
            </div>
          </div>

          {/* Job Details Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Header Section */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {job.title}
                  </h2>
                  <div className="flex items-center gap-2 mb-3">
                    <Building className="w-5 h-5 text-gray-500" />
                    <span className="text-lg text-gray-700">
                      {job.organization || "Confidential"}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {job.location}
                    </div>
                    {job.category && (
                      <div className="flex items-center gap-1">
                        <Tag className="w-4 h-4" />
                        {job.category}
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {job.publishedAt
                        ? new Date(job.publishedAt).toLocaleDateString()
                        : "N/A"}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(job.status)}
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      job.status
                    )}`}
                  >
                    {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                  </span>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Description */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Description
                    </h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div
                        className="prose prose-sm max-w-none text-gray-700"
                        dangerouslySetInnerHTML={{ __html: job.description }}
                      />
                    </div>
                  </div>

                  {/* Instructions */}
                  {job.instructions && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        Instructions
                      </h3>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div
                          className="prose prose-sm max-w-none text-gray-700"
                          dangerouslySetInnerHTML={{
                            __html: job.instructions,
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Key Information */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Key Information
                    </h3>
                    <div className="space-y-3">
                      {job.salary && (
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-gray-500" />
                          <div>
                            <p className="text-sm text-gray-600">Salary</p>
                            <p className="font-medium text-gray-900">
                              {job.salary}
                            </p>
                          </div>
                        </div>
                      )}
                      {job.deadline && (
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <div>
                            <p className="text-sm text-gray-600">Deadline</p>
                            <p className="font-medium text-gray-900">
                              {new Date(job.deadline).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      )}
                      {job.contactEmail && (
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-gray-500" />
                          <div>
                            <p className="text-sm text-gray-600">
                              Contact Email
                            </p>
                            <p className="font-medium text-gray-900">
                              {job.contactEmail}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Submission Info */}
                  {job.submittedBy && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Submission Info
                      </h3>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-gray-600">Submitted by</p>
                          <p className="font-medium text-gray-900">
                            {job.submittedBy}
                          </p>
                        </div>
                        {job.submittedAt && (
                          <div>
                            <p className="text-sm text-gray-600">
                              Submitted on
                            </p>
                            <p className="font-medium text-gray-900">
                              {new Date(job.submittedAt).toLocaleDateString()}
                            </p>
                          </div>
                        )}
                        {job.approvedBy && (
                          <div>
                            <p className="text-sm text-gray-600">Approved by</p>
                            <p className="font-medium text-gray-900">
                              {job.approvedBy}
                            </p>
                          </div>
                        )}
                        {job.approvedAt && (
                          <div>
                            <p className="text-sm text-gray-600">Approved on</p>
                            <p className="font-medium text-gray-900">
                              {new Date(job.approvedAt).toLocaleDateString()}
                            </p>
                          </div>
                        )}
                        {job.rejectionReason && (
                          <div>
                            <p className="text-sm text-gray-600">
                              Rejection Reason
                            </p>
                            <p className="font-medium text-red-600">
                              {job.rejectionReason}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Documents */}
                  {job.documents && job.documents.length > 0 && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Documents
                      </h3>
                      <div className="space-y-2">
                        {job.documents.map((doc, index) => (
                          <a
                            key={index}
                            href={doc}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 p-2 bg-white rounded border hover:bg-gray-50 transition-colors"
                          >
                            <FileText className="w-4 h-4 text-blue-600" />
                            <span className="text-sm text-gray-700">
                              {doc.split("/").pop() || `Document ${index + 1}`}
                            </span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    </ProtectedAdminRoute>
  );
}


