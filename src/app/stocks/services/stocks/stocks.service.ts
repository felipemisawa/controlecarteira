import { Injectable } from '@angular/core';
import { Firestore } from 'src/app/core/classes/firestore.class';
import { Stock } from '../../models/stock.model';
import { AngularFirestore, QueryFn } from '@angular/fire/firestore';
import { AuthService } from 'src/app/core/services/auth.service';
import { firestore } from 'firebase';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StocksService extends Firestore<Stock> {
  constructor(private authService: AuthService, db: AngularFirestore) {
    super(db);
    this.init();
  }

  private init(): void {
    this.authService.authState$.subscribe(user => {
      if (user) {
        this.setCollection(`/users/${user.uid}/stocks`, (ref: firestore.CollectionReference) => {
          return ref.orderBy('ticker', 'asc');
        });
        return;
      }
      this.setCollection(null);
    });
  }

  getQuery(queryfn: QueryFn): Observable<Stock[]> {
    return this.db.collection(this.collection.ref, queryfn).valueChanges() as Observable<Stock[]>;
  }
}
