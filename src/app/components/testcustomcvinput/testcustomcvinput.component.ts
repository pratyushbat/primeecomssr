import { Component, HostBinding } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-testcustomcvinput',
  templateUrl: './testcustomcvinput.component.html',
  styleUrl: './testcustomcvinput.component.scss'
})
export class TestcustomcvinputComponent {
  form: FormGroup;
  @HostBinding('class.yellow-style') yellowStyle = true;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required]
    });
  }

  submit() {
    console.log(this.form.value);
  }
}
