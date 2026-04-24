import { updateSession } from '@/lib/supabase/proxy'
import { type NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = await updateSession(request)

  // Proteger rutas admin - redirigir a login si no hay sesión válida
  if (request.nextUrl.pathname.startsWith('/pdf-processor')) {
    // Verificar si hay una sesión activa en las cookies
    const hasSession = request.cookies.has('sb-auth-token') || 
                      request.cookies.get('sb-refresh-token') ||
                      request.cookies.get('sb-access-token')

    // Si no hay sesión, redirigir a login
    if (!hasSession) {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
