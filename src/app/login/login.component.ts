import { Component, OnInit, ViewChild } from '@angular/core';
import { ImageUrls } from 'src/assets/images/image-urls';
import { NgImageSliderComponent } from 'ng-image-slider';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GraphqlService } from '../services/graphql.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('nav') slider: NgImageSliderComponent;
  public images = ImageUrls['food-images'];
  public imageObject = [];
  public loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  constructor(
    public graphql: GraphqlService,
    public router: Router,
    public auth: AuthService
  ) { }

  ngOnInit(): void {
    this.images.forEach(img => {
      this.imageObject.push({
        image: img,
        thumbImage: img
      })
    })
  }

  prevImageClick() {
    this.slider.prev();
  }

  nextImageClick() {
      this.slider.next();
  }

  userLogin(){
    this.graphql.userLogin(this.loginForm.get('email').value, 
      this.loginForm.get('password').value).subscribe(<UserResponse> (data)=>{
        console.log(data.data.userLogin);
        this.auth.setCurrentUser(data.data.userLogin);
        console.log(localStorage.getItem('access_token'));
    });
  }

}
