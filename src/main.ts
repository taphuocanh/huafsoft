import { enableProdMode, importProvidersFrom } from '@angular/core';
import { environment } from '@environments/environment';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent, routes as appRoutes } from '@app/app.component';
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS, provideHttpClient, HttpClientModule } from '@angular/common/http';
import { JwtInterceptor, ErrorInterceptor, FakeBackendInterceptor } from '@app/_helpers';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(HttpClientModule),
    provideHttpClient(),
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: FakeBackendInterceptor, multi: true },
    provideRouter(appRoutes)
  ],
}).catch(err => console.error(err));
