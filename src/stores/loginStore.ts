import { writable } from "svelte/store";

import {
  filter,
  map,
  merge,
  Observable,
  publishReplay,
  refCount,
  startWith,
  switchMap,
  tap,
} from "rxjs";
import { analytics, auth, db } from "../services/DB/firebase";
import { doc, DocumentData, onSnapshot } from "firebase/firestore";
import type { User } from "firebase/auth";
import { logEvent } from "firebase/analytics";

export const userAuth$ = new Observable<User>(obs =>
  auth.onAuthStateChanged(
    user => {
      console.log("asdf");
      return obs.next(user);
    },
    err => obs.error(err),
    () => obs.complete()
  )
).pipe(publishReplay(), refCount());

const defaultUserInformation = {
  isAdmin: false,
  birthdate: null,
  email: null,
  name: null,
  id: null,
};

const defaultUserInformation$ = userAuth$.pipe(
  filter(u => !u),
  map(() => defaultUserInformation)
);
const updatedUserInformation$ = userAuth$.pipe(
  filter(u => !!u),
  switchMap(
    () =>
      new Observable<DocumentData>(obs =>
        onSnapshot(doc(db, "users", auth.currentUser.uid), doc => {
          obs.next(doc);
        })
      )
  ),
  tap(doc => {
    if (!doc.exists()) {
      console.error("No such document!");
      logEvent(analytics, "no_user_document", {
        user: auth.currentUser.uid,
      });
    }
  }),
  map(doc =>
    doc.exists()
      ? {
          id: doc.id as string,
          isAdmin: doc.data().isAdmin as boolean,
          birthdate: doc.data().birthdate,
          email: doc.data().email,
          name: doc.data().name,
        }
      : defaultUserInformation
  )
);

export const userInformation$ = merge(defaultUserInformation$, updatedUserInformation$).pipe(
  startWith(defaultUserInformation),
  publishReplay(),
  refCount()
);
export const userAuthFailStore = writable(null);
