import {BehaviorSubject} from 'rxjs';

export type SuperBehaviourSubjectNext<T> = T | ((previousValue: T) => T);

export  class SuperBehaviourSubject<T> extends BehaviorSubject<T> {
  next(value: SuperBehaviourSubjectNext<T>): void {
    if (typeof value === 'function') {
      // @ts-ignore
      return super.next(value(this._value)); // _value of BehaviorSubject must became not so private
    }
    super.next(value);
  }
}
