# Production Admin Authentication Fix

## Issue
Admin dashboard authentication failures in production with errors:
- `{"error":"Invalid or expired token"}`
- `{"error":"Invalid admin token"}`

## Root Causes
1. **Inconsistent JWT secrets**: Different JWT secret fallbacks across admin authentication routes
2. **Missing authentication**: Dashboard stats API route had no authentication check
3. **Cookie settings**: Incompatible cookie settings for production environment

## Files Fixed

### 1. Admin Authentication Routes
- **`src/app/api/admin/auth/login/route.js`**
  - Changed JWT secret from `'your-super-secret-jwt-key-change-in-production'` to `'your-secret-key'`
  - Updated cookie settings: `sameSite: 'lax'`, added `path: '/'`

- **`src/app/api/admin/auth/logout/route.js`**
  - Updated cookie settings: `sameSite: 'lax'`, added `path: '/'`

- **`src/app/api/admin/auth/me/route.js`**
  - Changed JWT secret from `'your-super-secret-jwt-key-change-in-production'` to `'your-secret-key'`

### 2. Dashboard Stats API
- **`src/app/api/dashboard/stats/route.js`**
  - Added admin authentication check
  - Added JWT verification with standardized secret
  - Added role-based access control (admin/super-admin only)

## Environment Variables Required
Make sure these environment variables are set in production (Vercel):

```bash
JWT_SECRET=your-production-jwt-secret-key-here
```

## Verification
After deployment, verify that:
1. Admin login works correctly
2. Dashboard stats load without authentication errors
3. All admin panel features (Assignments, Ambassadors, Appointments) work properly

## Notes
- All admin API routes now use consistent JWT secret fallback: `'your-secret-key'`
- Cookie settings are optimized for production with `sameSite: 'lax'` and `path: '/'`
- Dashboard stats API now properly authenticates admin users before returning data
