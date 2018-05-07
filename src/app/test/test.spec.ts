import { FirebaseApp, FirebaseAppConfig, AngularFireModule, FirebaseAppName } from 'angularfire2';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFirestoreCollection } from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { TestBed, inject } from '@angular/core/testing';
import { COMMON_CONFIG } from './test-config';

interface Stock {
  name: string;
  price: number;
}

describe('AngularFirestore', () => {
  let app: FirebaseApp;
  let afs: AngularFirestore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(COMMON_CONFIG),
        AngularFirestoreModule.enablePersistence()
      ]
    });
    inject([FirebaseApp, AngularFirestore], (_app: FirebaseApp, _afs: AngularFirestore) => {
      app = _app;
      afs = _afs;
    })();
  });

  afterEach(done => {
    // can't await here https://github.com/firebase/firebase-js-sdk/issues/605
    app.delete();
    done();
  });

  fit('should be the properly initialized type', () => {
    expect(afs instanceof AngularFirestore).toBe(true);
  });

  fit('should have an initialized Firebase app', () => {
    expect(afs.firestore.app).toBeDefined();
    expect(afs.firestore.app).toEqual(app);
  });

  fit('should create an AngularFirestoreDocument from a string path', () => {
    const doc = afs.doc('a/doc');
    expect(doc instanceof AngularFirestoreDocument).toBe(true);
  });

  // fit('should create an AngularFirestoreDocument from a string path', () => {
  //   const ref = afs.doc('a/doc').ref.toString();
  //   const doc = afs.doc(ref);
  //   expect(doc instanceof AngularFirestoreDocument).toBe(true);
  // });

  fit('should create an AngularFirestoreCollection from a string path', () => {
    const collection = afs.collection('stuffs');
    expect(collection instanceof AngularFirestoreCollection).toBe(true);
  });

  fit('should create an AngularFirestoreCollection from a reference', () => {
    const ref = afs.collection('stuffs').ref;
    const collection = afs.collection(ref.toString());
    expect(collection instanceof AngularFirestoreCollection).toBe(true);
  });

  fit('should throw on an invalid document path', () => {
    const singleWrapper = () => afs.doc('collection');
    const tripleWrapper = () => afs.doc('collection/doc/subcollection');
    expect(singleWrapper).toThrowError();
    expect(tripleWrapper).toThrowError();
  });

  fit('should throw on an invalid collection path', () => {
    const singleWrapper = () => afs.collection('collection/doc');
    const quadWrapper = () => afs.collection('collection/doc/subcollection/doc');
    expect(singleWrapper).toThrowError();
    expect(quadWrapper).toThrowError();
  });

  // fit('should enable persistence', (done) => {
  //   const sub1 = afs.persistenceEnabled$.subscribe(isEnabled => {
  //     expect(isEnabled).toBe(true);
  //     done();
  //   });
  // });

});

const FIREBASE_APP_NAME_TOO = (Math.random() + 1).toString(36).substring(7);

describe('AngularFirestore without persistance', () => {
  let app: FirebaseApp;
  let afs: AngularFirestore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(COMMON_CONFIG),
        AngularFirestoreModule
      ]
    });
    inject([FirebaseApp, AngularFirestore], (_app: FirebaseApp, _afs: AngularFirestore) => {
      app = _app;
      afs = _afs;
    })();
  });

  fit('should not enable persistence', (done) => {
    afs.persistenceEnabled$.subscribe(isEnabled => {
      expect(isEnabled).toBe(false);
      done();
    });
  });

});
