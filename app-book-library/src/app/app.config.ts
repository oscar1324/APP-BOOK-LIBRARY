import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withRouterConfig } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { CoreModule } from './core/core-module';
import { ExtraOptions } from '@angular/router';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideHttpClient( withFetch()),
    provideRouter(
      routes,
      
    ), 
    provideClientHydration(withEventReplay())
  ]
};

const routerOptions: ExtraOptions = {
    // ESTA ES LA PROPIEDAD CLAVE: 
    // Fuerza el scroll al inicio (0, 0) en cada navegación.
    scrollPositionRestoration: 'enabled',
    
    // Opcional: Permite navegar a fragmentos (#section)
    anchorScrolling: 'enabled',

    // Opcional: Define un desplazamiento para barras fijas (si tienes una)
    scrollOffset: [0, 0] // Sin desplazamiento inicial
};


