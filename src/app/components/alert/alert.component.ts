import { Component } from '@angular/core';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss'
})
export class AlertComponent {
  alert$ = this.alertService.alert$;
  constructor(public alertService: AlertService) { }
}
