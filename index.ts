import { Observable } from 'rxjs';

console.log('App started');

const colsObservable$ = new Observable<number>(subscriber => {
  let value = 1;
  const intervalId = setInterval(() => {
    subscriber.next(value++);
  }, 1000);
});


const hotObservable$ = new Observable<string>(subscriber => {
  const intervalId = setInterval(() => {
    subscriber.next(new Date().toLocaleTimeString());
  }, 1000);
});

colsObservable$.subscribe({
  next: value => console.log('Got value A:', value),
  complete: () => console.log('Completed A'),
  error: err => console.error('Got error A:', err)
});

setTimeout(() => {
  colsObservable$.subscribe({
    next: value => console.log('Got value B:', value),
    complete: () => console.log('Completed B'),
    error: err => console.error('Got error B:', err)
  });
}, 3000);

