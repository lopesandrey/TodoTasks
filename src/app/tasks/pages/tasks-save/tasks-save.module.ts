import { NgModule } from '@angular/core';

import { TasksSavePageRoutingModule } from './tasks-save-routing.module';

import { TasksSavePage } from './tasks-save.page';
import { SharedModule } from 'src/app/shared/shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    TasksSavePageRoutingModule
  ],
  declarations: [TasksSavePage]
})
export class TasksSavePageModule {}
