import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { NavController, MenuController } from '@ionic/angular';
import { OverlayService } from 'src/app/core/services/overlay.service';

@Component({
  selector: 'app-logout-button',
  templateUrl: './logout-button.component.html',
  styleUrls: ['./logout-button.component.scss'],
})
export class LogoutButtonComponent implements OnInit {

  @Input() menu: string;

  constructor(
    private authService: AuthService,
    private navCtrl: NavController,
    private overlaySerivce: OverlayService,
    private menuController: MenuController,
  ) { }

  async ngOnInit(): Promise<void> {
    if (! (await this.menuController.isEnabled(this.menu))) {
      this.menuController.enable(true, this.menu);
    }
  }

  async logout(): Promise<void> {
    await this.overlaySerivce.alert({
      message: 'Do you really want to quit?',
      buttons: [
        {
          text: 'Yes',
          handler: async () => {
            await this.authService.logout();
            await this.menuController.enable(false, this.menu);
            this.navCtrl.navigateRoot('/login');
          }
        },
        'No'
      ]
    });
  }

}
