import { Component, Input, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { ImageUrls } from 'src/assets/images/image-urls';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import * as icons from '@fortawesome/free-regular-svg-icons';
import { environment } from 'src/environments/environment';
import { GraphqlService } from '../services/graphql.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  public loggedIn = false;
  public images = ImageUrls['banner-images'];
  public icons = icons;
  public loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })
  public businessMap = [];


  constructor(
    public graphql: GraphqlService,
    public router: Router,
    public route: ActivatedRoute,
    public auth: AuthService
  ) { }

  ngOnInit(): void {
    if(this.auth.isLoggedIn){
      this.loggedIn = true;
      document.getElementById('login-form').style.display = 'none';
      document.getElementById('view-container').style.justifyContent = 'center';
    }else this.loggedIn = false;
    this.configureMap();

  }

  userLogin(){
    this.graphql.userLogin(this.loginForm.get('email').value, 
      this.loginForm.get('password').value).subscribe(<UserResponse>(data)=>{
        this.auth.setCurrentUser(data.data.userLogin)
        this.loggedIn = true;
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('view-container').style.justifyContent = 'center';
        location.reload();
      });
  }

  configureMap(){
    const map = new mapboxgl.Map({
      container: 'home-map',
      accessToken: environment.mapboxy_key,
      // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-79.4512, 43.6568],
      zoom: 13
    });
       
      // Add the control to the map.
    map.addControl(
      new MapboxGeocoder({
      accessToken: environment.mapboxy_key,
      mapboxgl: mapboxgl
      })
    );
  }

  navigateToCategory(id){
    this.router.navigate(['categories']);
  }
}
