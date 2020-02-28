import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TasksSavePage } from './tasks-save.page';

describe('TasksSavePage', () => {
  let component: TasksSavePage;
  let fixture: ComponentFixture<TasksSavePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TasksSavePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TasksSavePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
