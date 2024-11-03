import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { provideAuth0 } from "@auth0/auth0-angular"; 
import { provideHttpClient } from "@angular/common/http";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(),
    provideAuth0({
      domain: 'dev-fg6i1mf6amp47jx5.us.auth0.com',  
      clientId: 'cLX7IksQ4n58pigtNVLRtoWx6UbfQuLy',
      authorizationParams: {
        redirect_uri: window.location.origin,
      },
    }),
  ],
};
