import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameTrialComponent } from './game-trial.component';

describe('GameTrialComponent', () => {
  let component: GameTrialComponent;
  let fixture: ComponentFixture<GameTrialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameTrialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameTrialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
