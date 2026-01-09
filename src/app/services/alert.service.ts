import { Injectable } from '@angular/core';
import { Alert } from '../models/alert.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private alertSubject = new BehaviorSubject<Alert | null>(null);
  alert$ = this.alertSubject.asObservable();

  show(alert: Alert) {
    this.alertSubject.next({ ...alert, id: crypto.randomUUID() });

    if (alert.timeout) {
      setTimeout(() => this.clear(), alert.timeout);
    }
  }

  success(message: string) {
    this.show({ type: 'success', message, timeout: 3000 });
  }

  error(message: string) {
    this.show({ type: 'error', message });
  }

  clear() {
    this.alertSubject.next(null);
  }

}
