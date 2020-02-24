import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-tasks-item',
  templateUrl: './tasks-item.component.html',
  styleUrls: ['./tasks-item.component.scss'],
})
export class TasksItemComponent implements OnInit {

  @Input() task: Task;
  @Output() done: EventEmitter<Task> = new EventEmitter<Task>();
  @Output() update: EventEmitter<Task> = new EventEmitter<Task>();
  @Output() delete: EventEmitter<Task> = new EventEmitter<Task>();

  constructor() { }

  ngOnInit() {}

}
