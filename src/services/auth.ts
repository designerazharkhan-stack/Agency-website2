import {
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { auth, isFirebaseConfigured } from './firebase';
import { AdminUser } from '../types';

const LOCAL_ADMIN_KEY = 'agency_admin_session';

export async function loginAdmin(email: string, pass: string): Promise<AdminUser> {
  if (isFirebaseConfigured && auth) {
    const userCredential = await signInWithEmailAndPassword(auth, email, pass);
    const fbUser = userCredential.user;
    return {
      uid: fbUser.uid,
      email: fbUser.email || email,
      displayName: fbUser.displayName || 'Administrator',
      role: 'superadmin'
    };
  }

  // Local fallback mode when Firebase Auth is not configured:
  // Allows testing the admin panel locally. Default credentials: admin@agency.com / admin123
  if (
    (email.toLowerCase() === 'admin@agency.com' && pass === 'admin123') ||
    (email.toLowerCase() === 'demo@agency.com' && pass === 'demo123') ||
    (email.length > 3 && pass.length >= 6) // Friendly test login
  ) {
    const localUser: AdminUser = {
      uid: 'local-admin-1',
      email: email.toLowerCase(),
      displayName: email.split('@')[0].toUpperCase(),
      role: 'superadmin'
    };
    localStorage.setItem(LOCAL_ADMIN_KEY, JSON.stringify(localUser));
    return localUser;
  }

  throw new Error('Invalid email or password. For demo mode, use admin@agency.com / admin123');
}

export async function logoutAdmin(): Promise<void> {
  if (isFirebaseConfigured && auth) {
    await firebaseSignOut(auth);
  }
  localStorage.removeItem(LOCAL_ADMIN_KEY);
}

export function getCurrentLocalUser(): AdminUser | null {
  const session = localStorage.getItem(LOCAL_ADMIN_KEY);
  if (!session) return null;
  try {
    return JSON.parse(session);
  } catch {
    return null;
  }
}

export function subscribeToAuthChanges(callback: (user: AdminUser | null) => void): () => void {
  if (isFirebaseConfigured && auth) {
    return onAuthStateChanged(auth, (fbUser: FirebaseUser | null) => {
      if (fbUser) {
        callback({
          uid: fbUser.uid,
          email: fbUser.email || '',
          displayName: fbUser.displayName || 'Administrator',
          role: 'superadmin'
        });
      } else {
        const local = getCurrentLocalUser();
        callback(local);
      }
    });
  }

  // Local fallback listener
  const local = getCurrentLocalUser();
  callback(local);
  return () => {};
}
