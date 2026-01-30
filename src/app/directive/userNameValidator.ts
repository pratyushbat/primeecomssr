import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

export function usernameAsyncValidator(control: AbstractControl): Observable<ValidationErrors | null> {
    const forbiddenNames = ['admin', 'root', 'test'];

    return of(control.value).pipe(
        delay(1000), // simulate API call
        map(value => {
            return forbiddenNames.includes(value)
                ? { usernameTaken: true }
                : null;
        })
    );
}
