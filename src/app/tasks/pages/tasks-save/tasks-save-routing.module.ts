import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TasksSavePage } from './tasks-save.page';

const routes: Routes = [
  {
    path: '',
    component: TasksSavePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TasksSavePageRoutingModule {}
