import { EMPTY, Observable, of, interval } from 'rxjs';
import { catchError, concatMap, mergeMap, switchMap, timeout, take, map } from 'rxjs/operators';


const letters$ = new Observable<string>(subscriber => {
  setTimeout(() => {
    subscriber.next('A');
  }, 1000);
  setTimeout(() => {
    subscriber.next('B');
    subscriber.complete();
  }, 2000);
});

function getNumberSeries$(letter: string): Observable<string> {
  return new Observable<string>(subscriber => {
    let nbr = 1;
    const intervalId = setInterval(() => {
      subscriber.next(letter + nbr);
      if(nbr == 5) {
        subscriber.complete();
      }
      nbr++;
    }, 350);
    return () => {
      clearInterval(intervalId);
    }
  });
}

letters$
.pipe(
  switchMap(letter => getNumberSeries$(letter))
)
.subscribe({
  next: (val) => console.log('Got value:', val),
  error: (err) => console.error('Got error:', err),
  complete: () => console.log('Completed!'),
});




