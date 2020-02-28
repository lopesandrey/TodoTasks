import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';


const routes: Routes = [
  {
    path: '',
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'create',
        loadChildren: () => import('./pages/tasks-save/tasks-save.module').then( m => m.TasksSavePageModule)
      },
      {
        path: 'edit/:id',
        loadChildren: () => import('./pages/tasks-save/tasks-save.module').then( m => m.TasksSavePageModule)
      },
      {
        path: '',
        loadChildren: () => import('./pages/tasks-list/tasks-list.module').then(m => m.TasksListPageModule),
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
