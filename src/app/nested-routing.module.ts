import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusinessPageComponent } from './categories/business-page/business-page.component';
import { CategoriesComponent } from './categories/categories.component';
import { ContactComponent } from './contact/contact.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ProfileSettingsComponent } from './profile/profile-settings/profile-settings.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path: '',
    title: '',
    component: NavigationComponent,
    children: [
      {
        path: 'home',
        title: 'Home',
        component: LandingPageComponent,
      },
      {
        path: 'signup',
        title: 'Signup',
        component: SignupComponent,
      },
      {
        path: 'login',
        title: 'Login',
        component: LoginComponent,
      },
      {
        path: 'profile/:id',
        title: 'Profile',
        component: ProfileComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'settings',
                title: 'Profile',
                component: ProfileSettingsComponent,
                canActivate: [AuthGuard]
            }
        ]
      },
      {
        path: 'categories',
        title: 'Categories',
        component: CategoriesComponent,
      },
      {
        path: 'categories/business/:id',
        title: 'Business Profile',
        component: BusinessPageComponent
      }, 
      {
        path: 'contact',
        title: 'Contact',
        component: ContactComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class NestingRoutingModule { }