import { EMPTY, forkJoin, Observable, of } from 'rxjs';
import { concatMap, switchMap, mergeMap, catchError } from 'rxjs/operators';

function loginUser$(letter: string): Observable<number> {
  return new Observable<number>((subscriber) => {
    setTimeout(() => {
      subscriber.next(1234);
      subscriber.complete();
    }, 1000);
  });
}

function getUserAddress(userid: number): Observable<string> {
  return new Observable<string>((subscriber) => {
    setTimeout(() => {
      subscriber.next('Testroad 13');
      subscriber.complete();
    }, 2000);
  });
}

function getUserPhoneNumber(userid: number): Observable<string> {
  return new Observable<string>((subscriber) => {
    setTimeout(() => {
      subscriber.next('070-123 456');
      subscriber.complete();
    }, 3000);
  });
}

function getUserInfo$(userId: number): Observable<string[]> {
  return forkJoin([getUserAddress(userId), getUserPhoneNumber(userId)])
}

loginUser$('Kiwi')
.pipe(concatMap(userId => getUserInfo$(userId)))
.subscribe({
  next: (value) => console.log('Got value:', value),
  complete: () => console.log('Completed'),
  error: (err) => console.error('Got error:', err),
});
