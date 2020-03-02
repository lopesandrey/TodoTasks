import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from '../../models/task.model';
import { TasksService } from '../../services/tasks.service';
import { NavController } from '@ionic/angular';
import { OverlayService } from 'src/app/core/services/overlay.service';
import { take } from 'rxjs/operators';

import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.page.html',
  styleUrls: ['./tasks-list.page.scss'],
})
export class TasksListPage implements OnInit {

  public tasks$: Observable<Task[]>;
  public photo: SafeResourceUrl;

  constructor(
    private tasksService: TasksService,
    private navCtrl: NavController,
    private overlayService: OverlayService,
    private sanitizer: DomSanitizer,
  ) { }

  ngOnInit() {
  }

  async ionViewDidEnter(): Promise<void>{
    const loading = await this.overlayService.loading();
    this.tasks$ = this.tasksService.getAll();
    this.tasks$.pipe(take(1)).subscribe(tasks => loading.dismiss());
  }

  public onUpdate(task: Task): void {
    this.navCtrl.navigateForward(`/tasks/edit/${task.id}`);
  }

  async onDelete(task: Task): Promise<void> {
    await this.overlayService.alert({
      message: `Do you really want to delete the task "${task.title}"`,
      buttons: [
        {
          text: 'Yes',
          handler: async () => {
            await this.tasksService.delete(task);
            await this.overlayService.toast({
              message: `Task "${task.title}" deleted!`
            });
          }
        },
        'No'
      ]
    });
  }

  async onDone(task: Task): Promise<void> {
    const taskToUpdate = {...task, done: !task.done};

    await this.tasksService.update(taskToUpdate);
    await this.overlayService.toast({
      message: `Task "${taskToUpdate.title}" ${taskToUpdate.done ? 'completed' : 'updated'} !`,
    });
  }

  async takePicture() {
    const image = await Plugins.Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });

    this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl));
  }

}
