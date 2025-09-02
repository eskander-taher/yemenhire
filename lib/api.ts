import axios from "axios";

// Direct connection to Express server - no proxy
const baseURL = process.env.NODE_ENV === "development" 
  ? "http://localhost:5000/api" 
  : "https://api.yemenhire.com/api";

// Create axios instance with base configuration for direct Express server calls
export const apiClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 10000, // 10 seconds timeout
  withCredentials: false, // Disable credentials for CORS
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    console.log(
      `🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`
    );
    return config;
  },
  (error) => {
    console.error("❌ Request Error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error("❌ API Error:", error.message);
    return Promise.reject(error);
  }
);

// Types based on your API structure
export interface Job {
  _id: string;
  title: string;
  organization: string;
  location: string;
  publishedAt: string;
  deadline?: string;
  description: string;
  instructions?: string;
  documents?: string[];
  salary?: string;
  category?: string;
  contactEmail?: string;
  status: "pending" | "approved" | "rejected";
  submittedBy?: string;
  submittedAt: string;
  approvedBy?: string;
  approvedAt?: string;
  rejectionReason?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Tender {
  _id: string;
  title: string;
  organization: string;
  location: string;
  publishedAt: string;
  deadline?: string;
  description: string;
  instructions?: string;
  documents?: string[];
  budget?: string;
  category?: string;
  contactEmail?: string;
  status: "pending" | "approved" | "rejected";
  submittedBy?: string;
  submittedAt: string;
  approvedBy?: string;
  approvedAt?: string;
  rejectionReason?: string;
  createdAt: string;
  updatedAt: string;
}

export interface JobsResponse {
  jobs: Job[];
  total: number;
  page: number;
  limit: number;
}

export interface TendersResponse {
  tenders: Tender[];
  total: number;
  page: number;
  limit: number;
}

// Helper function to simulate API delay for better UX
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// API functions
export const jobsApi = {
  // Get paginated jobs
  getJobs: async (
    params: {
      page?: number;
      limit?: number;
      search?: string;
      location?: string;
      category?: string;
      type?: string;
    } = {}
  ): Promise<JobsResponse> => {
    try {
      const response = await apiClient.get("/jobs", { params });
      return {
        jobs: response.data.jobs || response.data,
        total: response.data.total || response.data.length || 0,
        page: params.page || 1,
        limit: params.limit || 12,
      };
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
      throw new Error("Failed to load jobs. Please try again later.");
    }
  },

  // Get single job by ID
  getJob: async (id: string): Promise<Job> => {
    try {
      const response = await apiClient.get(`/jobs/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch job ${id}:`, error);
      throw new Error("Job not found or failed to load.");
    }
  },

  // Create job
  createJob: async (jobData: Partial<Job>): Promise<Job> => {
    try {
      const response = await apiClient.post("/jobs", jobData);
      return response.data;
    } catch (error) {
      console.error("Failed to create job:", error);
      throw new Error("Failed to create job. Please try again.");
    }
  },
};

export const tendersApi = {
  // Get paginated tenders
  getTenders: async (
    params: {
      page?: number;
      limit?: number;
      search?: string;
      location?: string;
      category?: string;
    } = {}
  ): Promise<TendersResponse> => {
    try {
      const response = await apiClient.get("/tenders", { params });
      return {
        tenders: response.data.tenders || response.data,
        total: response.data.total || response.data.length || 0,
        page: params.page || 1,
        limit: params.limit || 12,
      };
    } catch (error) {
      console.error("Failed to fetch tenders:", error);
      throw new Error("Failed to load tenders. Please try again later.");
    }
  },

  // Get single tender by ID
  getTender: async (id: string): Promise<Tender> => {
    try {
      const response = await apiClient.get(`/tenders/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch tender ${id}:`, error);
      throw new Error("Tender not found or failed to load.");
    }
  },

  // Create tender
  createTender: async (tenderData: Partial<Tender>): Promise<Tender> => {
    try {
      const response = await apiClient.post("/tenders", tenderData);
      return response.data;
    } catch (error) {
      console.error("Failed to create tender:", error);
      throw new Error("Failed to create tender. Please try again.");
    }
  },
};

export const authApi = {
  login: async (password: string): Promise<{ token: string }> => {
    try {
      const response = await apiClient.post("/auth/login", { password });
      return response.data;
    } catch (error) {
      console.error("Login failed:", error);
      throw new Error("Login failed. Please check your credentials.");
    }
  },
};

// Set auth token for admin requests
export const setAuthToken = (token: string) => {
  apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

// Remove auth token
export const removeAuthToken = () => {
  delete apiClient.defaults.headers.common["Authorization"];
};

// Test API connection
export const testApiConnection = async (): Promise<boolean> => {
  try {
    await apiClient.get("/jobs");
    return true;
  } catch (error) {
    console.error("API connection test failed:", error);
    return false;
  }
};
