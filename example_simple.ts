import { Observable } from 'rxjs';

const observable$ = new Observable<string>(subscriber => {

});

observable$
.subscribe(value => console.log(value));

observable$
.subscribe({
  next: value => console.log('Got value:', value),
  complete: () => console.log('Completed'),
  error: err => console.error('Got error:', err)
});

const allProducts$ = new Observable<string[]>(subscriber => {
  console.log('Fetching products');
  setTimeout(() => {
    subscriber.next(['Product1', 'Product2', 'Product3']);
    subscriber.complete();
  }, 1000);
});

function storeDataOnServer$(data: string): Observable<boolean> {
return new Observable<boolean>(subscriber => {
  console.log('Storing data on server');
  setTimeout(() => {
    subscriber.next(true);
    subscriber.complete();
  }, 1000);
});
}



