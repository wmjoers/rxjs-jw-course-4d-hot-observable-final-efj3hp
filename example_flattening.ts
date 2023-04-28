import { EMPTY, Observable, of } from 'rxjs';
import { concatMap, switchMap, mergeMap, catchError } from 'rxjs/operators';

const observable$ = new Observable<string>((subscriber) => {
  setTimeout(() => {
    subscriber.next('A');
  }, 1000);
  setTimeout(() => {
    subscriber.next('B');
    subscriber.complete();
  }, 2000);
});

function getFruits$(letter: string): Observable<string> {
  return new Observable<string>((subscriber) => {

    const fruits = {'A':'Apple', 'B':'Pear'};

    let v = 0;
    const intervalId = setInterval(() => {
      v++;
      subscriber.next(fruits[letter] + v);
      if (v == 5) {
        subscriber.complete();
      }
    }, 350);

    return () => {
      console.log('Teardown', fruits[letter]);
      clearInterval(intervalId); 
    };
    
  });
}

observable$.pipe(
  concatMap((letter) => getFruits$(letter))
)
.subscribe({
  next: (value) => console.log('Got value:', value),
  complete: () => console.log('Completed'),
  error: (err) => console.error('Got error:', err),
});
