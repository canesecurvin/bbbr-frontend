import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { MaterialModule } from './material/material.module';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './navigation/navigation.component';
import { CategoriesComponent } from './categories/categories.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileSettingsComponent } from './profile/profile-settings/profile-settings.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ContactComponent } from './contact/contact.component';
import { BusinessPageComponent } from './categories/business-page/business-page.component';

//bootstrap
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgImageSliderModule } from 'ng-image-slider';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthInterceptor } from './services/authconfig.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    NavigationComponent,
    CategoriesComponent,
    ProfileComponent,
    ProfileSettingsComponent,
    LoginComponent,
    SignupComponent,
    ContactComponent,
    BusinessPageComponent,
    BusinessPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MaterialModule,
    NgbModule,
    NgImageSliderModule,
    FontAwesomeModule,
    GraphQLModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
