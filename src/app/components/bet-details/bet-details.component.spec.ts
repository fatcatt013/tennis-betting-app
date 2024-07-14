import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BetDetailsComponent } from './bet-details.component';

describe('BetDetailsComponent', () => {
  let component: BetDetailsComponent;
  let fixture: ComponentFixture<BetDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BetDetailsComponent]
    });
    fixture = TestBed.createComponent(BetDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
