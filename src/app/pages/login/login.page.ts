import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  registerForm: FormGroup
  loginForm: FormGroup
  @ViewChild('flipcontainer', { static: false }) flipcontainer: ElementRef
  constructor(private fb: FormBuilder, private authService: AuthService, private loadingController: LoadingController, private toastController: ToastController, private alertController: AlertController, private router: Router) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      name: ['', Validators.required],
      role: ['BUYER', Validators.required]
    })

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  async login() {
    let loading = await this.loadingController.create({
      message: 'Loading...'
    })
    await loading.present()
    this.authService.signIn(this.loginForm.value).subscribe(user => {
      loading.dismiss()
      console.log('after login:', user)
      this.navigateByRole(user['role'])
    }, async err => {
      await loading.dismiss()
      let alert = await this.alertController.create({
        header: 'Error',
        message: err.message,
        buttons: ['OK']
      })
      alert.present()
    })
  }

  async register() {
    let loading = await this.loadingController.create({
      message: "Signing up..."
    })
    await loading.present()

    this.authService.signUp(this.registerForm.value).then(async res => {
      await loading.dismiss()

      let toast = await this.toastController.create({
        duration: 3000,
        message: 'Successfully created new Account!'
      })
      toast.present()
      console.log('finished: ', res)
      this.navigateByRole(this.registerForm.value['role'])
    }, async err => {
      await loading.dismiss()
      let alert = await this.alertController.create({
        header: 'Error',
        message: err.message,
        buttons: ['OK']
      })
      alert.present()
    })
  }

  toggleRegister() {
    this.flipcontainer.nativeElement.classList.toggle('flip');
  }

  navigateByRole(role) {
    if (role == 'BUYER') {
      this.router.navigateByUrl('/buyer')
    } else if (role == 'SELLER') {
      this.router.navigateByUrl('/seller')
    }
  }
}
