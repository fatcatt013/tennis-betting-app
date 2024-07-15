import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BetDetailsTableComponent } from './bet-details-table.component';

describe('BetDetailsTableComponent', () => {
  let component: BetDetailsTableComponent;
  let fixture: ComponentFixture<BetDetailsTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BetDetailsTableComponent]
    });
    fixture = TestBed.createComponent(BetDetailsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
