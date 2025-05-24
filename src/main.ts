import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { IonicModule } from '@ionic/angular';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import {provideFirebaseApp,initializeApp} from '@angular/fire/app';
import {provideFirestore,getFirestore} from '@angular/fire/firestore'
import { environment } from './environments/environment';
import { enableProdMode, importProvidersFrom } from '@angular/core';


bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(IonicModule.forRoot({})),
    provideHttpClient(),
    provideRouter(routes),
    provideFirebaseApp(() => 
      initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
  ],
});
