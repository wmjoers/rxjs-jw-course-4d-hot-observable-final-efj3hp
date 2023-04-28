import { Observable, forkJoin } from 'rxjs';

const allProducts$ = new Observable<string[]>(subscriber => {
  console.log('Fetching products');
  setTimeout(() => {
    subscriber.next(['Product1', 'Product2', 'Product3']);
    subscriber.complete();
  }, 1000);
});

const allPrices$ = new Observable<number[]>(subscriber => {
  console.log('Fetching prices');
  let prices = [100, 200, 300];
  setTimeout(() => {
    subscriber.next([100, 200, 300]);
    subscriber.complete();
  }, 1000);
});

forkJoin([allProducts$, allPrices$])
.subscribe({
  next: value => console.log('Got value:', value),
  complete: () => console.log('Completed'),
  error: err => console.error('Got error:', err)
});

