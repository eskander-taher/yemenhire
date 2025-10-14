# Admin Panel Integration

The admin panel has been successfully merged into the Next.js client application. The admin functionality is now accessible at `/admin/*` routes.

## Features

### Authentication
- **Login Page**: `/admin/login` - Secure admin login with JWT authentication
- **Protected Routes**: All admin routes require authentication
- **Session Management**: Automatic token refresh and expiry handling

### Dashboard (`/admin`)
- Overview statistics for jobs and tenders
- Pending reviews count and quick actions
- Recent activity feed for jobs and tenders
- Analytics charts showing approval rates
- Category breakdowns
- Quick navigation to pending items

### Jobs Management (`/admin/jobs`)
- View all approved jobs in a paginated grid
- Create new jobs with rich text editor
- Edit existing jobs
- Delete jobs with confirmation
- Search and filter by category
- View job details

### Tenders Management (`/admin/tenders`)
- View all approved tenders in a paginated grid
- Create new tenders with rich text editor
- Edit existing tenders
- Delete tenders with confirmation
- Search and filter by category
- View tender details

### Pending Jobs (`/admin/pending-jobs`)
- Review job submissions awaiting approval
- Approve jobs with one click
- Reject jobs with reason
- View detailed information before decision

### Pending Tenders (`/admin/pending-tenders`)
- Review tender submissions awaiting approval
- Approve tenders with one click
- Reject tenders with reason
- View detailed information before decision

### Details Pages
- **Job Details**: `/admin/jobs/[id]` - Comprehensive view of job information
- **Tender Details**: `/admin/tenders/[id]` - Comprehensive view of tender information
- Display all metadata, submission info, approval history
- Document downloads
- Status indicators

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **State Management**: @tanstack/react-query for server state
- **Forms**: React Hook Form with rich text editor (Tiptap)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Notifications**: react-toastify
- **HTTP Client**: Axios with interceptors

## File Structure

```
client/
├── app/
│   └── admin/
│       ├── layout.tsx                  # Admin root layout with providers
│       ├── login/
│       │   └── page.tsx               # Login page
│       ├── page.tsx                   # Dashboard
│       ├── jobs/
│       │   ├── page.tsx              # Jobs management
│       │   └── [id]/
│       │       └── page.tsx          # Job details
│       ├── tenders/
│       │   ├── page.tsx              # Tenders management
│       │   └── [id]/
│       │       └── page.tsx          # Tender details
│       ├── pending-jobs/
│       │   └── page.tsx              # Pending jobs review
│       └── pending-tenders/
│           └── page.tsx              # Pending tenders review
├── components/
│   └── admin/
│       ├── AdminLayout.tsx           # Main admin layout
│       ├── AdminSidebar.tsx          # Navigation sidebar
│       ├── ProtectedAdminRoute.tsx   # Auth guard wrapper
│       └── RichTextEditor.tsx        # Tiptap rich text editor
├── contexts/
│   └── AdminAuthContext.tsx          # Authentication context
└── lib/
    └── admin-api.ts                  # API client with auth interceptors
```

## API Endpoints

The admin panel communicates with the following API endpoints:

### Authentication
- `POST /api/auth/login` - Admin login

### Jobs
- `GET /api/jobs/admin/approved` - Get approved jobs
- `GET /api/jobs/admin/pending` - Get pending jobs
- `GET /api/jobs/:id` - Get job details
- `POST /api/jobs/admin` - Create new job
- `PUT /api/jobs/:id` - Update job
- `DELETE /api/jobs/:id` - Delete job
- `PUT /api/jobs/admin/:id/approve` - Approve job
- `PUT /api/jobs/admin/:id/reject` - Reject job

### Tenders
- `GET /api/tenders/admin/approved` - Get approved tenders
- `GET /api/tenders/admin/pending` - Get pending tenders
- `GET /api/tenders/:id` - Get tender details
- `POST /api/tenders` - Create new tender
- `PUT /api/tenders/:id` - Update tender
- `DELETE /api/tenders/:id` - Delete tender
- `PUT /api/tenders/admin/:id/approve` - Approve tender
- `PUT /api/tenders/admin/:id/reject` - Reject tender

## Environment Variables

The admin panel uses the following environment-aware configuration:

- **Development**: `http://localhost:5000/api`
- **Production**: `https://api.yemenhires.com/api`

## Security Features

1. **JWT Authentication**: Secure token-based authentication
2. **Protected Routes**: Client-side route guards
3. **Automatic Logout**: On token expiration (401 responses)
4. **Local Storage**: Encrypted token storage
5. **Request Interceptors**: Automatic token injection
6. **Response Interceptors**: Error handling and auto-redirect

## Getting Started

1. Navigate to `/admin/login`
2. Enter admin credentials
3. Upon successful login, you'll be redirected to the dashboard
4. Use the sidebar to navigate between sections

## Default Credentials

Contact your system administrator for admin credentials.

## Development

To run the admin panel in development mode:

```bash
cd client
npm run dev
```

The admin panel will be available at `http://localhost:3000/admin`

## Notes

- The admin panel is fully responsive and works on all devices
- Rich text editor supports formatting, lists, tables, and more
- File uploads support documents up to 50MB
- All forms include validation and error handling
- Toast notifications provide feedback for all actions



