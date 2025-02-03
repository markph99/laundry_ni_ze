import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobOrdComponent } from './job-ord.component';

describe('JobOrdComponent', () => {
  let component: JobOrdComponent;
  let fixture: ComponentFixture<JobOrdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobOrdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobOrdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
