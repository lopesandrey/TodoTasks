import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TasksService } from '../../services/tasks.service';
import { NavController } from '@ionic/angular';
import { OverlayService } from 'src/app/core/services/overlay.service';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-tasks-save',
  templateUrl: './tasks-save.page.html',
  styleUrls: ['./tasks-save.page.scss'],
})
export class TasksSavePage implements OnInit {

  public taskForm: FormGroup;
  public pageTitle = '...';
  public taskId: string = undefined;

  constructor(
    private fb: FormBuilder,
    private tasksService: TasksService,
    private navCtrl: NavController,
    private overlaySerive: OverlayService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.createForm();

    this.init();
  }

  public init(): void {
    const taskId = this.route.snapshot.paramMap.get('id');

    if (!taskId) {
      this.pageTitle = 'Create Task';
      return;
    }

    this.taskId = taskId;
    this.pageTitle = 'Edit Task';

    this.tasksService
      .get(taskId)
      .pipe(take(1))
      .subscribe(({ title, done }) => {
        this.taskForm.get('title').setValue(title);
        this.taskForm.get('done').setValue(done);
      });
  }

  async onSubmit(): Promise<void> {
    const loading = await this.overlaySerive.loading({
      message: 'Saving...'
    });
    try {
      !this.taskId
        ? await this.tasksService.create(this.taskForm.value)
        : await this.tasksService.update({
          id: this.taskId,
          ...this.taskForm.value
        });

      this.navCtrl.navigateBack('/tasks')
    } catch (error) {
      await this.overlaySerive.toast({
        message: error.message
      });
    } finally {
      loading.dismiss();
    }
  }

  private createForm(): void {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      done: [false],
    });
  }

}
