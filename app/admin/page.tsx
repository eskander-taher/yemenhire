"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { adminAxios } from "@/lib/admin-api";
import AdminLayout from "@/components/admin/AdminLayout";
import ProtectedAdminRoute from "@/components/admin/ProtectedAdminRoute";
import {
  FileText,
  ClipboardList,
  Clock,
  CheckCircle,
  XCircle,
  TrendingUp,
  Building,
  MapPin,
  Tag,
  Eye,
  ArrowRight,
  BarChart3,
  Activity,
  Target,
  AlertCircle,
} from "lucide-react";

interface Job {
  _id: string;
  title: string;
  organization?: string;
  location: string;
  status: string;
  category?: string;
  [key: string]: any;
}

interface Tender {
  _id: string;
  title: string;
  organization?: string;
  location: string;
  status: string;
  category?: string;
  [key: string]: any;
}

export default function AdminDashboardPage() {
  const router = useRouter();

  const { data: jobsData, isLoading: jobsLoading } = useQuery({
    queryKey: ["approved-jobs"],
    queryFn: async () => {
      const res = await adminAxios.get("/jobs/admin/approved");
      return res.data;
    },
  });

  const { data: tendersData, isLoading: tendersLoading } = useQuery({
    queryKey: ["approved-tenders"],
    queryFn: async () => {
      const res = await adminAxios.get("/tenders/admin/approved");
      return res.data;
    },
  });

  const { data: pendingJobsData, isLoading: pendingJobsLoading } = useQuery({
    queryKey: ["pending-jobs"],
    queryFn: async () => {
      const res = await adminAxios.get("/jobs/admin/pending");
      return res.data.jobs;
    },
  });

  const { data: pendingTendersData, isLoading: pendingTendersLoading } =
    useQuery({
      queryKey: ["pending-tenders"],
      queryFn: async () => {
        const res = await adminAxios.get("/tenders/admin/pending");
        return res.data.tenders;
      },
    });

  const isLoading =
    jobsLoading ||
    tendersLoading ||
    pendingJobsLoading ||
    pendingTendersLoading;

  // Calculate statistics
  const approvedJobs = jobsData?.total || 0;
  const approvedTenders = tendersData?.total || 0;
  const pendingJobs = pendingJobsData?.length || 0;
  const pendingTenders = pendingTendersData?.length || 0;
  const totalJobs = approvedJobs + pendingJobs;
  const totalTenders = approvedTenders + pendingTenders;

  // Get recent activities (last 5 items)
  const recentJobs = jobsData?.jobs?.slice(0, 5) || [];
  const recentTenders = tendersData?.tenders?.slice(0, 5) || [];

  // Get unique categories
  const jobCategories = [
    ...new Set(
      jobsData?.jobs?.map((job: Job) => job.category).filter(Boolean) || []
    ),
  ];
  const tenderCategories = [
    ...new Set(
      tendersData?.tenders
        ?.map((tender: Tender) => tender.category)
        .filter(Boolean) || []
    ),
  ];

  // Calculate approval rates
  const jobApprovalRate =
    totalJobs > 0 ? Math.round((approvedJobs / totalJobs) * 100) : 0;
  const tenderApprovalRate =
    totalTenders > 0 ? Math.round((approvedTenders / totalTenders) * 100) : 0;

  if (isLoading) {
    return (
      <ProtectedAdminRoute>
        <AdminLayout>
          <div className="p-6">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
                  >
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                    <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                  </div>
                ))}
              </div>
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
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600 mt-1">
                  Welcome back! Here&apos;s what&apos;s happening with your platform.
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm text-gray-500">Last updated</p>
                  <p className="text-sm font-medium text-gray-900">
                    {new Date().toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Jobs
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {totalJobs}
                  </p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600">
                      {jobApprovalRate}% approved
                    </span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Tenders
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {totalTenders}
                  </p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600">
                      {tenderApprovalRate}% approved
                    </span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                  <ClipboardList className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Pending Reviews
                  </p>
                  <p className="text-3xl font-bold text-yellow-600">
                    {pendingJobs + pendingTenders}
                  </p>
                  <div className="flex items-center mt-2">
                    <AlertCircle className="w-4 h-4 text-yellow-500 mr-1" />
                    <span className="text-sm text-yellow-600">
                      Requires attention
                    </span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Active Categories
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {jobCategories.length + tenderCategories.length}
                  </p>
                  <div className="flex items-center mt-2">
                    <Tag className="w-4 h-4 text-purple-500 mr-1" />
                    <span className="text-sm text-purple-600">
                      Diverse content
                    </span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Tag className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions & Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Quick Actions */}
            <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Activity className="w-5 h-5 mr-2 text-blue-600" />
                Quick Actions
              </h2>
              <div className="space-y-3">
                <button
                  onClick={() => router.push("/admin/pending-jobs")}
                  className="w-full flex items-center justify-between p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-blue-600 mr-3" />
                    <div className="text-left">
                      <p className="font-medium text-blue-900">Review Jobs</p>
                      <p className="text-sm text-blue-700">
                        {pendingJobs} pending
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-blue-600" />
                </button>

                <button
                  onClick={() => router.push("/admin/pending-tenders")}
                  className="w-full flex items-center justify-between p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                >
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-green-600 mr-3" />
                    <div className="text-left">
                      <p className="font-medium text-green-900">
                        Review Tenders
                      </p>
                      <p className="text-sm text-green-700">
                        {pendingTenders} pending
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-green-600" />
                </button>

                <button
                  onClick={() => router.push("/admin/jobs")}
                  className="w-full flex items-center justify-between p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
                >
                  <div className="flex items-center">
                    <FileText className="w-5 h-5 text-purple-600 mr-3" />
                    <div className="text-left">
                      <p className="font-medium text-purple-900">Manage Jobs</p>
                      <p className="text-sm text-purple-700">
                        {totalJobs} total
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-purple-600" />
                </button>

                <button
                  onClick={() => router.push("/admin/tenders")}
                  className="w-full flex items-center justify-between p-3 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
                >
                  <div className="flex items-center">
                    <ClipboardList className="w-5 h-5 text-orange-600 mr-3" />
                    <div className="text-left">
                      <p className="font-medium text-orange-900">
                        Manage Tenders
                      </p>
                      <p className="text-sm text-orange-700">
                        {totalTenders} total
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-orange-600" />
                </button>
              </div>
            </div>

            {/* Analytics Chart */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
                Platform Analytics
              </h2>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Jobs Approval Rate
                    </span>
                    <span className="text-sm font-medium text-gray-900">
                      {jobApprovalRate}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${jobApprovalRate}%` }}
                    ></div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Tenders Approval Rate
                    </span>
                    <span className="text-sm font-medium text-gray-900">
                      {tenderApprovalRate}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${tenderApprovalRate}%` }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">
                      {approvedJobs}
                    </p>
                    <p className="text-sm text-blue-700">Approved Jobs</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">
                      {approvedTenders}
                    </p>
                    <p className="text-sm text-green-700">Approved Tenders</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Jobs */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-blue-600" />
                  Recent Jobs
                </h2>
                <button
                  onClick={() => router.push("/admin/jobs")}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
                >
                  View All
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-3">
                {recentJobs.length > 0 ? (
                  recentJobs.map((job: Job) => (
                    <div
                      key={job._id}
                      className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex-shrink-0">
                        {job.status === "approved" && (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        )}
                        {job.status === "rejected" && (
                          <XCircle className="w-5 h-5 text-red-600" />
                        )}
                        {job.status === "pending" && (
                          <Clock className="w-5 h-5 text-yellow-600" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 truncate">
                          {job.title}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                          <Building className="w-4 h-4" />
                          <span>{job.organization || "Confidential"}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="w-4 h-4" />
                          <span>{job.location}</span>
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <button
                          onClick={() => router.push(`/admin/jobs/${job._id}`)}
                          className="text-blue-600 hover:text-blue-700"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <FileText className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                    <p className="text-gray-500">No jobs yet</p>
                  </div>
                )}
              </div>
            </div>

            {/* Recent Tenders */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                  <ClipboardList className="w-5 h-5 mr-2 text-green-600" />
                  Recent Tenders
                </h2>
                <button
                  onClick={() => router.push("/admin/tenders")}
                  className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center gap-1"
                >
                  View All
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-3">
                {recentTenders.length > 0 ? (
                  recentTenders.map((tender: Tender) => (
                    <div
                      key={tender._id}
                      className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex-shrink-0">
                        {tender.status === "approved" && (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        )}
                        {tender.status === "rejected" && (
                          <XCircle className="w-5 h-5 text-red-600" />
                        )}
                        {tender.status === "pending" && (
                          <Clock className="w-5 h-5 text-yellow-600" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 truncate">
                          {tender.title}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                          <Building className="w-4 h-4" />
                          <span>{tender.organization || "Confidential"}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="w-4 h-4" />
                          <span>{tender.location}</span>
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <button
                          onClick={() =>
                            router.push(`/admin/tenders/${tender._id}`)
                          }
                          className="text-green-600 hover:text-green-700"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <ClipboardList className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                    <p className="text-gray-500">No tenders yet</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* System Overview */}
          <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Target className="w-5 h-5 mr-2 text-blue-600" />
              System Overview
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                  <Tag className="w-4 h-4 mr-2 text-blue-600" />
                  Job Categories
                </h3>
                <div className="space-y-2">
                  {jobCategories.length > 0 ? (
                    jobCategories.map((category) => (
                      <div
                        key={category}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-gray-600">{category}</span>
                        <span className="text-gray-900 font-medium">
                          {jobsData?.jobs?.filter(
                            (job: Job) => job.category === category
                          ).length || 0}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">No categories yet</p>
                  )}
                </div>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                  <Tag className="w-4 h-4 mr-2 text-green-600" />
                  Tender Categories
                </h3>
                <div className="space-y-2">
                  {tenderCategories.length > 0 ? (
                    tenderCategories.map((category) => (
                      <div
                        key={category}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-gray-600">{category}</span>
                        <span className="text-gray-900 font-medium">
                          {tendersData?.tenders?.filter(
                            (tender: Tender) => tender.category === category
                          ).length || 0}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">No categories yet</p>
                  )}
                </div>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                  <BarChart3 className="w-4 h-4 mr-2 text-purple-600" />
                  Approval Status
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Approved Jobs:</span>
                    <span className="font-medium text-green-600">
                      {approvedJobs}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Approved Tenders:</span>
                    <span className="font-medium text-green-600">
                      {approvedTenders}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Pending Items:</span>
                    <span className="font-medium text-yellow-600">
                      {pendingJobs + pendingTenders}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    </ProtectedAdminRoute>
  );
}



