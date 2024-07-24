import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeEloModalComponent } from './change-elo-modal.component';

describe('ChangeEloModalComponent', () => {
  let component: ChangeEloModalComponent;
  let fixture: ComponentFixture<ChangeEloModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChangeEloModalComponent]
    });
    fixture = TestBed.createComponent(ChangeEloModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
