import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mock-mentorai.supabase.co';
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.mock';

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(name: string) {
        return request.cookies.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        request.cookies.set({
          name,
          value,
          ...options,
        });
        supabaseResponse = NextResponse.next({
          request: {
            headers: request.headers,
          },
        });
        supabaseResponse.cookies.set({
          name,
          value,
          ...options,
        });
      },
      remove(name: string, options: CookieOptions) {
        request.cookies.set({
          name,
          value: '',
          ...options,
        });
        supabaseResponse = NextResponse.next({
          request: {
            headers: request.headers,
          },
        });
        supabaseResponse.cookies.set({
          name,
          value: '',
          ...options,
        });
      },
    },
  });

  const pathname = request.nextUrl.pathname;

  // Allow static assets, public API endpoints, landing page, and auth screens
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') ||
    pathname === '/' ||
    pathname === '/login' ||
    pathname === '/register' ||
    pathname === '/auth/login' ||
    pathname === '/auth/register'
  ) {
    return supabaseResponse;
  }

  // Check for persistent session cookies (Supabase sb-*-auth-token or mentorai_session)
  const allCookies = request.cookies.getAll();
  const hasSbAuthToken = allCookies.some(c => c.name.startsWith('sb-') && c.name.includes('-auth-token') && c.value);
  const hasMentorSession = !!request.cookies.get('mentorai_session')?.value;

  let user = null;
  if (hasSbAuthToken) {
    try {
      const { data } = await supabase.auth.getUser();
      user = data.user;
    } catch (e) {
      // Session expired or refresh token failure
      user = null;
    }
  }

  const isAuthenticated = !!user || hasMentorSession;

  // Protected core routes: /tracks/*, /dashboard, /tutor, /learn/*, /admin, /billing, /onboarding
  const isProtectedRoute =
    pathname.startsWith('/tracks') ||
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/tutor') ||
    pathname.startsWith('/learn') ||
    pathname.startsWith('/admin') ||
    pathname.startsWith('/billing') ||
    pathname.startsWith('/onboarding');

  // If unauthenticated guest tries to access protected learning pages, redirect immediately
  if (isProtectedRoute && !isAuthenticated) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('redirect', pathname);
    return NextResponse.redirect(url);
  }

  // Admin route protection: verify admin privilege
  if (pathname.startsWith('/admin') && isAuthenticated) {
    const adminEmails = (process.env.ADMIN_EMAILS || 'creator@mentorai.uz,admin@mentorai.uz')
      .split(',')
      .map(e => e.trim().toLowerCase());
    const isSuperAdminEmail = user?.email && adminEmails.includes(user.email.toLowerCase());
    const hasAdminSessionCookie = request.cookies.get('mentorai_session')?.value === 'admin';

    if (user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (!isSuperAdminEmail && profile?.role !== 'admin' && !hasAdminSessionCookie) {
        const url = request.nextUrl.clone();
        url.pathname = '/dashboard';
        return NextResponse.redirect(url);
      }
    } else if (!hasAdminSessionCookie) {
      const url = request.nextUrl.clone();
      url.pathname = '/dashboard';
      return NextResponse.redirect(url);
    }
  }

  return supabaseResponse;
}
