# Authentication
Authentication is implemented using Supabase with the following pages:
- `/login` - Sign in with email and password
- `/signup` - Create a new account with email and password

## Environment Variables

Create a `.env.local` file in the project root and add:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

See `.env.example` for more details on how to get these values from Supabase.

## Key Components

**Auth Provider** (`lib/auth-context.tsx`)
- Global auth state management using React Context
- Tracks current user and authentication status
- Automatically syncs with Supabase auth state

**Auth Actions** (`lib/auth-actions.ts`)
- Server-side authentication functions
- `signUp()` - Create new account
- `signIn()` - Login with credentials
- `signOut()` - Logout

**Auth Form** (`components/auth-form.tsx`)
- Reusable form component for login/signup
- Email validation and password matching
- Error handling and loading states

**Authenticated User Menu** (`components/authenticated-user-menu.tsx`)
- Shows user profile and email when signed in
- Logout functionality
- Profile link

**Protected Routes** (`lib/protected-route.tsx`)
- Wrapper component for protecting pages
- Redirects to `/login` if not authenticated
- Can be used to wrap sensitive pages

## Using in Components

**Client Components:**
```tsx
"use client";
import { useAuth } from "@/lib/auth-context";

export function MyComponent() {
  const { user, isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) return <div>Loading...</div>;
  
  return <div>
    {isAuthenticated ? `Welcome ${user?.email}` : "Please sign in"}
  </div>;
}
```

**Protected Pages:**
```tsx
import { ProtectedRoute } from "@/lib/protected-route";

export default function SecretPage() {
  return (
    <ProtectedRoute>
      <YourContent />
    </ProtectedRoute>
  );
}
```

## Supabase Setup

1. Create a Supabase project at https://supabase.com
2. Enable email/password authentication in Auth settings
3. Copy the Project URL and anon/public key
4. Add to `.env.local`

That's it! Your authentication system is ready to use.
