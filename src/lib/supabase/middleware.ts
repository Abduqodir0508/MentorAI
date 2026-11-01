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

  // If using placeholder mock credentials in local testing, bypass network call to avoid connection error
  const isMockSupabase = supabaseUrl.includes('mock-mentorai');

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

  // Static assets and auth callback routes bypass
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') ||
    pathname === '/' ||
    pathname === '/login' ||
    pathname === '/register'
  ) {
    return supabaseResponse;
  }

  if (isMockSupabase) {
    // In demo / mock mode without live Supabase cloud configured, allow seamless access to preview MVP
    return supabaseResponse;
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If unauthenticated and accessing protected dashboard/learn/admin routes
  if (!user && (pathname.startsWith('/dashboard') || pathname.startsWith('/learn') || pathname.startsWith('/tutor') || pathname.startsWith('/admin') || pathname.startsWith('/billing') || pathname.startsWith('/onboarding'))) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('redirect', pathname);
    return NextResponse.redirect(url);
  }

  // If user is authenticated, check role for admin routes
  if (user && pathname.startsWith('/admin')) {
    const adminEmails = (process.env.ADMIN_EMAILS || 'creator@mentorai.uz,admin@mentorai.uz').split(',').map(e => e.trim().toLowerCase());
    const isSuperAdminEmail = user.email && adminEmails.includes(user.email.toLowerCase());

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (!isSuperAdminEmail && profile?.role !== 'admin') {
      const url = request.nextUrl.clone();
      url.pathname = '/dashboard';
      return NextResponse.redirect(url);
    }
  }

  return supabaseResponse;
}

