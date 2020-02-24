import { NgModule } from '@angular/core';
import { TasksItemComponent } from './tasks-item/tasks-item.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';



@NgModule({
  declarations: [
    TasksItemComponent,
  ],
  imports: [
    SharedModule,
  ],
  exports: [
    TasksItemComponent,
  ]
})
export class ComponentsModule { }
