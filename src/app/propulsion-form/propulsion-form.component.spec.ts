import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropulsionFormComponent } from './propulsion-form.component';

describe('EngineFormComponent', () => {
  let component: PropulsionFormComponent;
  let fixture: ComponentFixture<PropulsionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropulsionFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropulsionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
