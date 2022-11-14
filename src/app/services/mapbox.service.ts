import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MapboxService {
  public mapKey = environment.mapboxy_key;

  constructor(
    public http: HttpClient
  ) { }

  getGeoCoordinates(addressString){
    let encodedUri = encodeURI(addressString);
    let request = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedUri}.json?
            proximity=ip&types=place%2Cpostcode%2Caddress&access_token=${this.mapKey}`;
    let response = [];
    return this.http.get(request)
  }
}
