import { Observable } from 'rxjs';

const observable$ = new Observable<string>(subscriber => {
  subscriber.next('Pelle');
  subscriber.next('Rasmus');
  subscriber.next('Kiwi');
});

observable$.subscribe(value => console.log(value));

observable$.subscribe({
  next: value => console.log('Got value:', value),
  complete: () => console.log('Completed'),
  error: err => console.error('Got error:', err)
});

