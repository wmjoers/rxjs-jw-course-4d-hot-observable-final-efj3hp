import { Observable, zip, merge, forkJoin } from 'rxjs';

const allProducts$ = new Observable<string>(subscriber => {
  console.log('Fetching products');
  let products = ['Product1', 'Product2', 'Product3'];
  setTimeout(() => {
    products.forEach(product => subscriber.next(product));
    subscriber.complete();
  }, 1000);
});

const allPrices$ = new Observable<number>(subscriber => {
  console.log('Fetching prices');
  let prices = [100, 200, 300];
  setTimeout(() => {
    prices.forEach(price => subscriber.next(price));
    subscriber.complete();
  }, 1000);
});

zip([allProducts$, allPrices$])
.subscribe({
  next: value => console.log('Got value:', value),
  complete: () => console.log('Completed'),
  error: err => console.error('Got error:', err)
});

