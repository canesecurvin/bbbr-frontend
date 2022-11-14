import { Component, OnInit, ViewChild } from '@angular/core';
import { ImageUrls } from 'src/assets/images/image-urls';
import { NgImageSliderComponent } from 'ng-image-slider';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GraphqlService } from '../services/graphql.service';
import { Router } from '@angular/router';
import { UserResponse } from '../graphql/types/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  @ViewChild('nav') slider: NgImageSliderComponent;
  public images = ImageUrls['food-images'];
  public imageObject = [];
  public signupForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
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

  newUser(){
    let form = this.signupForm;
    console.log(form.get('password'), form.get('confirmPassword'))
    if (form.get('password').value === form.get('confirmPassword').value){
      this.graphql.newUser(
        form.get('email').value,
        form.get('firstName').value,
        form.get('lastName').value,
        form.get('password').value
        ).subscribe(({data}: any)  => {
          console.log(data);
          this.graphql.userLogin(form.get('email').value, form.get('password').value).subscribe(<UserResponse>(data)=>{
            this.auth.setCurrentUser(data.data.userLogin);
            this.router.navigate(['home'])
          });
        })
    } else {console.log('passwords dont match');}
  }

}
