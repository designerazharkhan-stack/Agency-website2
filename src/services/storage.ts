import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage, isFirebaseConfigured } from './firebase';

export async function uploadImage(file: File, folder = 'uploads'): Promise<string> {
  // If Firebase is configured and storage is available, upload directly to Firebase Storage
  if (isFirebaseConfigured && storage) {
    try {
      const sanitizedName = file.name.replace(/[^a-zA-Z0-9.]/g, '_');
      const uniqueFileName = `${Date.now()}-${sanitizedName}`;
      const storageRef = ref(storage, `${folder}/${uniqueFileName}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadUrl = await getDownloadURL(snapshot.ref);
      return downloadUrl;
    } catch (error) {
      console.warn('Firebase storage upload failed, falling back to local data URL:', error);
    }
  }

  // Fallback: Read as Base64 data URL so images work persistently even before Firebase is provisioned
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to read file as data URL'));
      }
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}
