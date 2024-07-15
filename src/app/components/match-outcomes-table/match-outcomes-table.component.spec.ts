import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchOutcomesTableComponent } from './match-outcomes-table.component';

describe('MatchOutcomesTableComponent', () => {
  let component: MatchOutcomesTableComponent;
  let fixture: ComponentFixture<MatchOutcomesTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatchOutcomesTableComponent]
    });
    fixture = TestBed.createComponent(MatchOutcomesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
