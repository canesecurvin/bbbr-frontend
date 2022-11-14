import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NestingRoutingModule } from './nested-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';

const routes: Routes = [
  {
    path: '',
    title: '',
    component: AppComponent,  // this is the component with the <router-outlet> in the template
    children: [
      {
        path: 'home',  // child route path
        title: 'Home',
        component: NavigationComponent,  // child route component that the router renders
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), NestingRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
