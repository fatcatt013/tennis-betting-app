import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BetEntryComponent } from './bet-entry.component';

describe('BetEntryComponent', () => {
  let component: BetEntryComponent;
  let fixture: ComponentFixture<BetEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BetEntryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BetEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
