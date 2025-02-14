import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseService implements OnApplicationBootstrap {
  private firebaseApp: admin.app.App;

  constructor(private configService: ConfigService) {}

  // This will run when the application starts
  onApplicationBootstrap() {
    // Initialize Firebase only if it hasn't been initialized
    if (!admin.apps.length) {
      this.firebaseApp = admin.initializeApp({
        credential: admin.credential.cert({
          projectId: this.configService.get('firebase.projectId'),
          privateKey: this.configService.get('firebase.privateKey'),
          clientEmail: this.configService.get('firebase.clientEmail'),
        }),
      });
    } else {
      this.firebaseApp = admin.apps[0] as admin.app.App;
    }
  }

  // Method to get Firebase Admin instance
  getAuth() {
    if (!this.firebaseApp) {
      throw new Error('Firebase Admin not initialized');
    }
    return this.firebaseApp.auth();
  }
}
