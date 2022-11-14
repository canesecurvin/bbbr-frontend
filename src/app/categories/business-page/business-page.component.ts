import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgImageSliderComponent } from 'ng-image-slider';
import { ImageUrls } from 'src/assets/images/image-urls';
import * as mapboxgl from 'mapbox-gl';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { GraphqlService } from 'src/app/services/graphql.service';
import { BusinessResponse } from 'src/app/graphql/types/business';
import { MapboxService } from 'src/app/services/mapbox.service';


@Component({
  selector: 'app-business-page',
  templateUrl: './business-page.component.html',
  styleUrls: ['./business-page.component.css']
})
export class BusinessPageComponent implements OnInit {
  @ViewChild('nav') slider: NgImageSliderComponent;
  @Input() businessId = this.route.snapshot.paramMap.get('id');
  public business: BusinessResponse = {
    id: 0,
    businessName: '',
    ownerName: '',
    description: '',
    location: '',
    website: '',
    number: '',
    certifications: '',
    categoryId: 0
  };
  public images;
  public imageObject:any = [];

  constructor(
    public graphql: GraphqlService,
    public route: ActivatedRoute,
    public mapService: MapboxService
  ) { }

  ngOnInit() {
    this.getBusinessDetails(this.businessId);
  }

  getBusinessDetails(id){
    this.graphql.businessById(id).subscribe(<BusinessResponse>({data,loading})=> {
      this.business = data.business;
      this.getSliderPics(data.business.categoryId);
      this.mapService.getGeoCoordinates(this.business.location).subscribe(res=> {
        this.configureMap(res['features'][0]['center'])
        console.log(res['features'][0]['center']);
      });
    })
  }

  getSliderPics(id){
    if (id == 1) {
      this.images = ImageUrls['healthcare-images'];
    } else if (id == 2){
      this.images = ImageUrls['food-images'];
    } else {
      this.images = ImageUrls['services-images'];
    }
    this.images.forEach(img => {
      this.imageObject.push({
        image: img,
        thumbImage: img
      });
    })
  }

  prevImageClick() {
    this.slider.prev();
  }

  nextImageClick() {
      this.slider.next();
  }

  configureMap(center){
    const map = new mapboxgl.Map({
      container: 'business-map',
      accessToken: environment.mapboxy_key,
      // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
      style: 'mapbox://styles/mapbox/streets-v11',
      center: center,
      zoom: 13
    });

    new mapboxgl.Marker()
      .setLngLat(center)
      .addTo(map);

    map.flyTo({
      center: center,
      zoom: 15,
      speed: 3,
    })
       
      // Add the control to the map.
    map.addControl(
      new MapboxGeocoder({
      accessToken: environment.mapboxy_key,
      mapboxgl: mapboxgl
      })
    );
  }

}