import { Component, Input, OnInit } from '@angular/core';
import { ImageUrls } from 'src/assets/images/image-urls';
import * as mapboxgl from 'mapbox-gl';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import * as icons from '@fortawesome/free-regular-svg-icons';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { FavoriteResponse } from '../graphql/types/favorite';
import { GraphqlService } from '../services/graphql.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  @Input() userId = this.route.snapshot.paramMap.get('id');
  public userInfo = JSON.parse(localStorage.getItem('current_user'));
  public favorites: FavoriteResponse[];
  public businessMap = [
    {"business": "one"},
    {"business": "two"},
    {"business": "three"},
    {"business": "four"},
    {"business": "five"},
    {"business": "six"},
    {"business": "seven"},
    {"business": "eight"},
    {"business": "nine"},
    {"business": "ten"},
    {"business": "eleven"}
  ];
  public images = ImageUrls['food-images'];
  public icons = icons;

  constructor(
    public route: ActivatedRoute,
    public graphql: GraphqlService
  ) { }

  ngOnInit(): void {
    this.configureMap();
    this.graphql.getUserFavorites(this.userId).subscribe(<FavoriteResponse>({data})=> {
      this.favorites = [...data.userFavorites]
      console.log(...data.userFavorites);
    })
  }

  ngAfterViewInit(){
    this.favorites.forEach(f=> {
      console.log(f)
      this.randomPicture(f.business.id)
    })
  }

  randomPicture(id){
    console.log(id);
    let img = document.getElementById(`card-body-${id}`) as HTMLElement;
    console.log(img)
    img.style.backgroundImage = `url(${this.images[Math.floor(Math.random()*this.images.length)]})`;
  }

  configureMap(){
    const map = new mapboxgl.Map({
      container: 'map',
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

}
