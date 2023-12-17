import { redirect } from '@sveltejs/kit';
import type { AuthRequest, User } from 'lucia';

export async function getCurrentUserOrRedirectToLogin(auth: AuthRequest): Promise<User> {
  const session = await auth.validate();

  if (!session) {
    throw redirect(302, '/login');
  }

  return session.user;
}
