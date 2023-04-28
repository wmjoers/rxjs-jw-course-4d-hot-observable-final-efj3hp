import { Observable } from 'rxjs';

console.log('App started');

const observable$ = new Observable<number>(subscriber => {
  console.log('Inside observable');
  let value = 1;
  
  const intervalId = setInterval(() => {
    console.log('Emitting:',value);
    subscriber.next(value++);
  }, 1000);

  return () => {
    console.log('Teardown');
    clearInterval(intervalId);
  }
});

const subscription = observable$.subscribe({
  next: value => console.log('Got value:', value),
  complete: () => console.log('Completed'),
  error: err => console.error('Got error:', err)
});

setTimeout(() => {
  subscription.unsubscribe();
}, 5000);