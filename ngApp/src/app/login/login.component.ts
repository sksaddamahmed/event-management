import {Component, Directive, ElementRef, HostListener, OnInit, Renderer} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Directive({
selector : '[hideShowDirective]'
})
class CustomDirective{
  constructor(private elref : ElementRef,
              private renderer : Renderer){
    this.renderer.setElementStyle(elref.nativeElement,'background','grey')
    this.elref.nativeElement.style.backgroundColor = 'red'
  }

  @HostListener('mouseOver') onMouserHover(){
    let punchLine = this.elref.nativeElement.querySelector('.card-text')
    this.renderer.setElementStyle(punchLine,'display','block')
  }

  @HostListener('mouseOut') onMouserOut(){
    let punchLine = this.elref.nativeElement.querySelector('.card-text')
    this.renderer.setElementStyle(punchLine,'display','none')
  }
}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginUserData = {}
  isUserLoggedIn = false
  constructor(private _auth : AuthService,
              private _router : Router,
              ) { }

  ngOnInit() {

  }

  loginUser(){
    console.log(this.loginUserData)
    this._auth.loginUser(this.loginUserData)
      .subscribe(resp => {
          console.log(resp)
          this.isUserLoggedIn = true
          localStorage.setItem('token',resp.token)
          localStorage.setItem('userData',resp.loggedInUser.email)
          this._router.navigate(['/special'])
        },
          err => console.log(err)
      )
  }
}
