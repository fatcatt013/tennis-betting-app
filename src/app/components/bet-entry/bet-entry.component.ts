import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-bet-entry',
  templateUrl: './bet-entry.component.html',
  styleUrls: ['./bet-entry.component.scss']
})
export class BetEntryComponent implements OnInit {
  betForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.betForm = this.fb.group({
      match: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(1)]],
      odds: ['', [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit(): void {
    if (this.betForm.valid) {
      console.log(this.betForm.value);
      // Logic to handle form submission
    }
  }
}
