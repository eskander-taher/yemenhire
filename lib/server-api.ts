// ---------------------------------------------------------------------------
// Direct connection to Express server - no proxy layer
// ---------------------------------------------------------------------------
export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://api.yemenhire.com/api"
    : "http://localhost:5000/api";

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
  error?: string;
}

export interface TendersResponse {
  tenders: Tender[];
  total: number;
  page: number;
  limit: number;
  error?: string;
}

// ---------- JOBS ----------
export async function fetchJobs(
	params: {
		page?: number;
		limit?: number;
		search?: string;
		location?: string;
		category?: string;
		type?: string; // <-- keep, but never forward
	} = {}
): Promise<JobsResponse> {
	const { page = 1, limit = 20, search, location, category } = params; // <-- changed from 12 to 20
	const filters = new URLSearchParams();
	if (search) filters.append("search", search);
	if (location) filters.append("location", location);
	if (category) filters.append("category", category);
	filters.append("page", String(page));
	filters.append("limit", String(limit));
	// ❌ DO NOT forward page / limit (breaks upstream)

	const get = async (qs: string) => {
		const url = `${BASE_URL}/jobs${qs ? `?${qs}` : ""}`;
		return fetch(url, {
			headers: { Accept: "application/json" },
		});
	};

	// 1st try – with filters
	let res = await get(filters.toString());
	if (res.status === 404 && filters.toString()) {
		// 2nd try – no query-string at all
		res = await get("");
	}

	if (!res.ok) {
		console.error("Failed to fetch jobs:", res.status, await res.text());
		if (res.status === 429) {
			return {
				jobs: [],
				total: 0,
				page: 1,
				limit,
				error: "Too many requests. Please try again later.",
			};
		}
		return { jobs: [], total: 0, page: 1, limit };
	}

	const data = await res.json();
	return {
		jobs: data.jobs || data,
		total: data.total || (data.jobs || data).length,
		page,
		limit,
	};
}

export async function fetchJob(id: string): Promise<Job | null> {
	try {
		const response = await fetch(`${BASE_URL}/jobs/${id}`, {
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		});

		if (!response.ok) {
			throw new Error(`Failed to fetch job: ${response.status}`);
		}

		return await response.json();
	} catch (error) {
		console.error(`Failed to fetch job ${id}:`, error);
		return null;
	}
}

// ---------- TENDERS ----------
export async function fetchTenders(
	params: {
		page?: number;
		limit?: number;
		search?: string;
		location?: string;
		category?: string;
	} = {}
): Promise<TendersResponse> {
	const { page = 1, limit = 20, search, location, category } = params; // <-- changed from 12 to 20
	const filters = new URLSearchParams();
	if (search) filters.append("search", search);
	if (location) filters.append("location", location);
	if (category) filters.append("category", category);
	filters.append("page", String(page));
	filters.append("limit", String(limit));
	// ❌ DO NOT forward page / limit

	const get = async (qs: string) => {
		const url = `${BASE_URL}/tenders${qs ? `?${qs}` : ""}`;
		return fetch(url, {
			headers: { Accept: "application/json" },
		});
	};

	let res = await get(filters.toString());
	if (res.status === 404 && filters.toString()) {
		res = await get("");
	}

	if (!res.ok) {
		console.error("Failed to fetch tenders:", res.status, await res.text());
		if (res.status === 429) {
			return {
				tenders: [],
				total: 0,
				page: 1,
				limit,
				error: "Too many requests. Please try again later.",
			};
		}
		return { tenders: [], total: 0, page: 1, limit };
	}

	const data = await res.json();
	return {
		tenders: data.tenders || data,
		total: data.total || (data.tenders || data).length,
		page,
		limit,
	};
}

export async function fetchTender(id: string): Promise<Tender | null> {
	try {
		const response = await fetch(`${BASE_URL}/tenders/${id}`, {
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		});

		if (!response.ok) {
			throw new Error(`Failed to fetch tender: ${response.status}`);
		}

		return await response.json();
	} catch (error) {
		console.error(`Failed to fetch tender ${id}:`, error);
		return null;
	}
}

export async function fetchStats(): Promise<{
  jobs: number;
  tenders: number;
  companies: number;
  applications: number;
}> {
  try {
    const [jobsResponse, tendersResponse] = await Promise.all([
      fetchJobs({ limit: 20 }),
      fetchTenders({ limit: 20 }),
    ]);

    // Calculate unique organizations
    const organizations = new Set([
      ...jobsResponse.jobs.map((job) => job.organization),
      ...tendersResponse.tenders.map((tender) => tender.organization),
    ]);

    return {
      jobs: jobsResponse.total,
      tenders: tendersResponse.total,
      companies: organizations.size,
      applications: Math.floor(jobsResponse.total * 15), // Estimate
    };
  } catch (error) {
    console.error("Failed to fetch stats:", error);
    return {
      jobs: 0,
      tenders: 0,
      companies: 0,
      applications: 0,
    };
  }
}
