import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { AuthProvider } from 'src/app/core/services/auth.types';
import { OverlayService } from 'src/app/core/services/overlay.service';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public authProviders = AuthProvider;
  public authForm: FormGroup;
  public configs = {
    isSign: true,
    action: 'Login',
    actionChange: 'Create account'
  };

  private nameControl: FormControl = new FormControl('', [Validators.required, Validators.minLength(3)]);

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private overlaySerice: OverlayService,
    private navCtrl: NavController,
    private route: ActivatedRoute,
  ) { }

  public ngOnInit(): void {
    this.createForm();
  }

  public changeAuthAction(): void {
    this.configs.isSign = !this.configs.isSign;
    const { isSign } = this.configs;
    this.configs.action = isSign ? 'Login' : 'Sign Up';
    this.configs.actionChange = isSign ? 'Create account' : 'Already have an account';

    !isSign
      ? this.authForm.addControl('name', this.nameControl)
      : this.authForm.removeControl('name');
  }

  async onSubmit(provider: AuthProvider): Promise<void> {
    const loading = await this.overlaySerice.loading();

    try {
      const credentials = await this.authService.authenticate({
        isSignIn: this.configs.isSign,
        user: this.authForm.value,
        provider
      });

      this.navCtrl.navigateForward(this.route.snapshot.queryParamMap.get('redirect') || '/tasks');

    } catch (error) {
      await  this.overlaySerice.toast({
        message: error.message,
      });

    } finally {
      loading.dismiss();
    }
  }

  get name(): FormControl {
    return this.authForm.get('name') as FormControl;
  }

  get email(): FormControl {
    return this.authForm.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.authForm.get('password') as FormControl;
  }

  private createForm(): void {
    this.authForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

}
