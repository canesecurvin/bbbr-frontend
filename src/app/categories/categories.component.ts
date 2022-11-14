import { Component, Input, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { ImageUrls } from 'src/assets/images/image-urls';
import { environment } from 'src/environments/environment';
import { GraphqlService } from '../services/graphql.service';
import { CategoryResponse } from '../graphql/types/category';
import { BusinessResponse } from '../graphql/types/business';
import { ActivatedRoute, Router } from '@angular/router';
import { MapboxService } from '../services/mapbox.service';
import { AuthService } from '../services/auth.service';
import { FavoriteResponse } from '../graphql/types/favorite';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  public loggedIn = false;
  public images = ImageUrls['food-images'];
  public bmap;
  public map: mapboxgl.Map;
  public businessCenters = [];


  constructor(
    public graphql: GraphqlService,
    public route: ActivatedRoute,
    public router: Router,
    public mapService: MapboxService,
    public auth: AuthService
  ) { }

  ngOnInit(){
    if (this.auth.isLoggedIn){
      this.loggedIn = true;

    }
    this.configureMap();
    this.graphql.businessesByCategory(2).subscribe(<CategoryResponse>({data})=> {
      console.log(data)
      this.bmap = [...data.category.businesses]
    })
  }

  ngAfterViewInit(){
    this.bmap.forEach(bus=> {
      this.randomPicture(bus.id)
    })
  }

  randomPicture(id){
    let img = document.getElementById(`card-body-${id}`) as HTMLElement;
    img.style.backgroundImage = `url(${this.images[Math.floor(Math.random()*this.images.length)]})`;
  }

  randPic(){
    return this.images[Math.floor(Math.random()*this.images.length)];
  }

  configureMap(){
    this.map = new mapboxgl.Map({
      container: 'map',
      accessToken: environment.mapboxy_key,
      // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-79.4512, 43.6568],
      zoom: 13
    });
   
      // Add the control to the map.
    this.map.addControl(
      new MapboxGeocoder({
      accessToken: environment.mapboxy_key,
      mapboxgl: mapboxgl
      })
    );
  }

  navigateToBusinessPage(business){
    this.router.navigate(['categories/business/', business.id]
    )
  }

  addToFavorites(businessId){
    let currentUser = JSON.parse(localStorage.getItem('current_user'));
    this.graphql.addUserFavorite(currentUser.id, businessId).subscribe(<FavoriteResponse>(data)=> {
      console.log(data);
    });
  }

}

