"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminAxios } from "@/lib/admin-api";
import AdminLayout from "@/components/admin/AdminLayout";
import ProtectedAdminRoute from "@/components/admin/ProtectedAdminRoute";
import RichTextEditor from "@/components/admin/RichTextEditor";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
  Plus,
  Edit,
  Eye,
  Trash2,
  Calendar,
  MapPin,
  Building,
  Tag,
  Search,
  FileText,
  Mail,
  DollarSign,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  CheckCircle,
} from "lucide-react";

const API_URL = "/tenders";
const ITEMS_PER_PAGE = 12;

interface Tender {
  _id: string;
  title: string;
  organization?: string;
  location: string;
  publishedAt?: string;
  deadline?: string;
  description: string;
  instructions?: string;
  budget?: string;
  category?: string;
  contactEmail?: string;
  documents?: string[];
  [key: string]: any;
}

function DeleteModal({ onConfirm, onCancel }: { onConfirm: () => void; onCancel: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mx-auto mb-4">
          <Trash2 className="w-6 h-6 text-red-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">Delete Tender</h3>
        <p className="text-gray-600 text-center mb-6">Are you sure you want to delete this tender? This action cannot be undone.</p>
        <div className="flex gap-3">
          <button className="flex-1 bg-gray-100 text-gray-700 px-4 py-2.5 rounded-lg font-medium hover:bg-gray-200 transition-colors" onClick={onCancel}>Cancel</button>
          <button className="flex-1 bg-red-600 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-red-700 transition-colors" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
}

function TenderForm({ initial, onSave, onCancel }: { initial?: Tender; onSave: (formData: FormData) => void; onCancel: () => void }) {
  const [form, setForm] = useState<Partial<Tender>>(initial || { title: "", organization: "", location: "", publishedAt: "", deadline: "", description: "", instructions: "", budget: "", category: "", contactEmail: "", documents: [] });
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFiles(Array.from(e.target.files));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.location || !form.description) {
      setError("Title, Location, and Description are required");
      return;
    }
    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (key === "documents") return;
      if (value) data.append(key, value as string);
    });
    files.forEach((file) => data.append("documents", file));
    onSave(data);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900">{initial ? "Edit Tender" : "Create New Tender"}</h3>
      </div>
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><label className="block text-sm font-medium text-gray-700 mb-2">Tender Title *</label><input name="title" value={form.title || ""} onChange={handleChange} placeholder="Enter tender title" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-2">Organization</label><input name="organization" value={form.organization || ""} onChange={handleChange} placeholder="Enter organization name" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-2">Location *</label><input name="location" value={form.location || ""} onChange={handleChange} placeholder="Enter tender location" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-2">Category</label><input name="category" value={form.category || ""} onChange={handleChange} placeholder="Enter tender category" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-2">Budget</label><input name="budget" value={form.budget || ""} onChange={handleChange} placeholder="Enter budget range" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label><input name="contactEmail" value={form.contactEmail || ""} onChange={handleChange} placeholder="Enter contact email" type="email" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-2">Published Date</label><input name="publishedAt" value={form.publishedAt || ""} onChange={handleChange} type="date" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-2">Submission Deadline</label><input name="deadline" value={form.deadline || ""} onChange={handleChange} type="date" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" /></div>
        </div>
        <div><label className="block text-sm font-medium text-gray-700 mb-2">Tender Description *</label><RichTextEditor content={form.description || ""} onChange={(content) => setForm({ ...form, description: content })} placeholder="Enter detailed tender description" /></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-2">Submission Instructions</label><RichTextEditor content={form.instructions || ""} onChange={(content) => setForm({ ...form, instructions: content })} placeholder="Enter submission instructions" /></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-2">Documents</label><input type="file" multiple onChange={handleFileChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />{files.length > 0 && <div className="mt-2 space-y-1">{files.map((file, i) => (<div key={i} className="flex items-center text-sm text-gray-600"><FileText className="w-4 h-4 mr-2" />{file.name}</div>))}</div>}{initial && initial.documents && initial.documents.length > 0 && <div className="mt-2 space-y-1">{initial.documents.map((doc, i) => (<div key={i} className="flex items-center text-sm text-gray-500"><FileText className="w-4 h-4 mr-2" />Existing: {doc}</div>))}</div>}</div>
        {error && <div className="bg-red-50 border border-red-200 rounded-lg p-3"><p className="text-red-600 text-sm">{error}</p></div>}
        <div className="flex gap-3 pt-4"><button type="button" className="flex-1 bg-gray-100 text-gray-700 px-4 py-2.5 rounded-lg font-medium hover:bg-gray-200 transition-colors" onClick={onCancel}>Cancel</button><button type="submit" className="flex-1 bg-blue-600 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors">{initial ? "Update Tender" : "Create Tender"}</button></div>
      </form>
    </div>
  );
}

export default function AdminTendersPage() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [editing, setEditing] = useState<Tender | null>(null);
  const [creating, setCreating] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, error } = useQuery({
    queryKey: ["approved-tenders", currentPage],
    queryFn: async () => {
      const res = await adminAxios.get(`/tenders/admin/approved?page=${currentPage}&limit=${ITEMS_PER_PAGE}`);
      return res.data;
    },
  });

  const createMutation = useMutation({
    mutationFn: (formData: FormData) => adminAxios.post(API_URL, formData, { headers: { "Content-Type": "multipart/form-data" } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["approved-tenders"] });
      queryClient.invalidateQueries({ queryKey: ["pending-tenders"] });
      setCreating(false);
      toast.success("Tender created successfully");
    },
    onError: () => toast.error("Failed to create tender"),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: FormData }) => adminAxios.put(`${API_URL}/${id}`, formData, { headers: { "Content-Type": "multipart/form-data" } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["approved-tenders"] });
      setEditing(null);
      toast.success("Tender updated successfully");
    },
    onError: () => toast.error("Failed to update tender"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => adminAxios.delete(`${API_URL}/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["approved-tenders"] });
      toast.success("Tender deleted successfully");
    },
    onError: () => toast.error("Failed to delete tender"),
  });

  const tenders = data?.tenders || [];
  const totalTenders = data?.total || 0;
  const totalPages = Math.ceil(totalTenders / ITEMS_PER_PAGE);

  const filteredTenders = tenders.filter((tender: Tender) => {
    const matchesSearch = tender.title.toLowerCase().includes(searchTerm.toLowerCase()) || tender.organization?.toLowerCase().includes(searchTerm.toLowerCase()) || tender.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filterCategory || tender.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set((data?.tenders || []).map((tender: Tender) => tender.category).filter(Boolean) || [])];

  const handleSearchChange = (value: string) => { setSearchTerm(value); setCurrentPage(1); };
  const handleCategoryChange = (value: string) => { setFilterCategory(value); setCurrentPage(1); };

  const goToPage = (page: number) => { setCurrentPage(Math.max(1, Math.min(page, totalPages))); };
  const goToFirstPage = () => goToPage(1);
  const goToLastPage = () => goToPage(totalPages);
  const goToPreviousPage = () => goToPage(currentPage - 1);
  const goToNextPage = () => goToPage(currentPage + 1);

  if (isLoading) {
    return (<ProtectedAdminRoute><AdminLayout><div className="p-6"><div className="animate-pulse"><div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{[...Array(6)].map((_, i) => (<div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"><div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div><div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div><div className="h-3 bg-gray-200 rounded w-2/3"></div></div>))}</div></div></div></AdminLayout></ProtectedAdminRoute>);
  }

  if (error) {
    return (<ProtectedAdminRoute><AdminLayout><div className="p-6"><div className="text-center py-12"><div className="text-red-500 text-lg mb-2">Error loading tenders</div><button onClick={() => window.location.reload()} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">Try Again</button></div></div></AdminLayout></ProtectedAdminRoute>);
  }

  return (
    <ProtectedAdminRoute><AdminLayout><div className="p-6"><div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"><div><h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Approved Tenders</h1><p className="text-gray-600 mt-1">Manage approved tender postings in the system</p></div><button className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors" onClick={() => setCreating(true)}><Plus className="w-5 h-5" />New Tender</button></div>{creating && <div className="mb-8"><TenderForm onSave={(formData) => createMutation.mutate(formData)} onCancel={() => setCreating(false)} /></div>}<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6"><div className="flex flex-col sm:flex-row gap-4"><div className="flex-1"><div className="relative"><Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" /><input type="text" placeholder="Search tenders..." value={searchTerm} onChange={(e) => handleSearchChange(e.target.value)} className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" /></div></div><div className="sm:w-48"><select value={filterCategory} onChange={(e) => handleCategoryChange(e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"><option value="">All Categories</option>{categories.map((category) => (<option key={category} value={category}>{category}</option>))}</select></div></div></div><div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6"><div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4"><div className="flex items-center justify-between"><div><p className="text-sm font-medium text-gray-600">Approved Tenders</p><p className="text-2xl font-bold text-gray-900">{totalTenders}</p></div><div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center"><CheckCircle className="w-6 h-6 text-green-600" /></div></div></div><div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4"><div className="flex items-center justify-between"><div><p className="text-sm font-medium text-gray-600">Categories</p><p className="text-2xl font-bold text-gray-900">{categories.length}</p></div><div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center"><Tag className="w-6 h-6 text-purple-600" /></div></div></div></div><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{filteredTenders.map((tender: Tender) => (<div key={tender._id} className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"><div className="p-6"><div className="flex items-start justify-between mb-4"><div className="flex-1"><h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">{tender.title}</h3><div className="flex items-center text-sm text-gray-600 mb-2"><Building className="w-4 h-4 mr-1" />{tender.organization || "Confidential"}</div></div></div><div className="space-y-2 mb-4"><div className="flex items-center text-sm text-gray-600"><MapPin className="w-4 h-4 mr-2" />{tender.location}</div>{tender.category && <div className="flex items-center text-sm text-gray-600"><Tag className="w-4 h-4 mr-2" />{tender.category}</div>}{tender.budget && <div className="flex items-center text-sm text-gray-600"><DollarSign className="w-4 h-4 mr-2" />{tender.budget}</div>}{tender.contactEmail && <div className="flex items-center text-sm text-gray-600"><Mail className="w-4 h-4 mr-2" />{tender.contactEmail}</div>}<div className="flex items-center text-sm text-gray-600"><Calendar className="w-4 h-4 mr-2" />{tender.publishedAt ? new Date(tender.publishedAt).toLocaleDateString() : "N/A"}</div></div><div className="flex gap-2"><button className="flex items-center justify-center flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors" onClick={() => setEditing(tender)}><Edit className="w-4 h-4 mr-1" />Edit</button><button className="flex items-center justify-center flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors" onClick={() => router.push(`/admin/tenders/${tender._id}`)}><Eye className="w-4 h-4 mr-1" />View</button><button className="flex items-center justify-center flex-1 bg-red-100 text-red-600 px-3 py-2 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors" onClick={() => setDeleteId(tender._id)}><Trash2 className="w-4 h-4 mr-1" />Delete</button></div></div></div>))}</div>{filteredTenders.length === 0 && <div className="text-center py-12"><FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" /><h3 className="text-lg font-medium text-gray-900 mb-2">No tenders found</h3><p className="text-gray-600 mb-6">{searchTerm || filterCategory ? "Try adjusting your search or filter criteria" : "Get started by creating your first tender posting"}</p>{!searchTerm && !filterCategory && <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors" onClick={() => setCreating(true)}><Plus className="w-4 h-4 mr-2 inline" />Create First Tender</button>}</div>}{totalPages > 1 && <div className="flex justify-center items-center gap-2 mt-8"><button onClick={goToFirstPage} disabled={currentPage === 1} className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors" title="First page"><ChevronsLeft className="w-4 h-4" /></button><button onClick={goToPreviousPage} disabled={currentPage === 1} className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors" title="Previous page"><ChevronLeft className="w-4 h-4" /></button><div className="flex items-center gap-1">{Array.from({ length: Math.min(5, totalPages) }, (_, i) => { let pageNum; if (totalPages <= 5) { pageNum = i + 1; } else if (currentPage <= 3) { pageNum = i + 1; } else if (currentPage >= totalPages - 2) { pageNum = totalPages - 4 + i; } else { pageNum = currentPage - 2 + i; } return (<button key={pageNum} onClick={() => goToPage(pageNum)} className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${currentPage === pageNum ? "bg-blue-600 text-white" : "hover:bg-gray-100 text-gray-700"}`}>{pageNum}</button>); })}</div><button onClick={goToNextPage} disabled={currentPage === totalPages} className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors" title="Next page"><ChevronRight className="w-4 h-4" /></button><button onClick={goToLastPage} disabled={currentPage === totalPages} className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors" title="Last page"><ChevronsRight className="w-4 h-4" /></button></div>}{filteredTenders.length > 0 && <div className="text-center mt-4 text-sm text-gray-600">Showing {filteredTenders.length} of {totalTenders} tenders (Page {currentPage} of {totalPages})</div>}</div>{editing && <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"><div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"><TenderForm initial={editing} onSave={(formData) => updateMutation.mutate({ id: editing._id, formData })} onCancel={() => setEditing(null)} /></div></div>}{deleteId && <DeleteModal onConfirm={() => { deleteMutation.mutate(deleteId); setDeleteId(null); }} onCancel={() => setDeleteId(null)} />}</AdminLayout></ProtectedAdminRoute>
  );
}


