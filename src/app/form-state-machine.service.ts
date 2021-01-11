import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { EMPTY, merge, Observable } from 'rxjs';
import {
  distinctUntilChanged,
  map,
  pairwise,
  startWith,
  switchMap,
} from 'rxjs/operators';

export interface FormStateMachine {
  entry?: () => void;
  exit?: () => void;
  switcher?: Switcher[];
}

export interface Switcher {
  control: AbstractControl;
  states: { [key: string]: FormStateMachine };
}

@Injectable({
  providedIn: 'root',
})
export class FormStateMachineService {
  constructor() {}

  getFormStateObservable(stateDefinition: FormStateMachine): Observable<any> {
    // Tutaj następuje przerwanie wywołań
    if (
      !stateDefinition ||
      !stateDefinition.switcher ||
      !stateDefinition.switcher.length
    ) {
      return EMPTY;
    }

    // Parallel States
    return merge(
      ...stateDefinition.switcher.map((switcher) => {
        return this.getCompoundStatesStream(switcher);
      })
    );
  }

  getCompoundStatesStream(switcher: Switcher) {
    return switcher.control.valueChanges.pipe(
      startWith(switcher.control.value),
      distinctUntilChanged(),
      pairwise(),
      map((result) => {
        const mainState = result;
        const currentStateDefinition = switcher.states[mainState[0]];
        const destinationStateDefinition = switcher.states[mainState[1]];

        // Najpierw wykonaj exit u dziecka, a później exit rodzica
        this.fireExitChild(currentStateDefinition);

        // Przy każdej zmianie poddrzewo musi być wyznaczone na nowo
        const subTreeObservables = [];

        // Najpierw wykonaj entry u rodzica, a później entry dziecka
        this.fireEntryChild(destinationStateDefinition, subTreeObservables);

        return subTreeObservables;
      }),
      switchMap((subTreeObservables) => {
        return merge(...subTreeObservables);
      })
    );
  }

  private fireExitChild(formStateMachine: FormStateMachine) {
    if (formStateMachine && formStateMachine.switcher) {
      for (let i = formStateMachine.switcher.length; i > 0; i--) {
        const switcher = formStateMachine.switcher[i - 1];
        const currentSubStateDefinition =
          switcher.states[switcher.control.value];

        // rekurencja - exit następuje zaczynając od dzieci
        if (currentSubStateDefinition) {
          this.fireExitChild(currentSubStateDefinition);
        }
      }
    }

    if (formStateMachine && formStateMachine.exit) {
      formStateMachine.exit();
    }
  }

  private fireEntryChild(formStateMachine: FormStateMachine, subTreeObservables) {
    if (formStateMachine && formStateMachine.entry) {
      formStateMachine.entry();
    }
    if (formStateMachine && formStateMachine.switcher) {
      subTreeObservables.push(
        this.getFormStateObservable(formStateMachine)
      );
      formStateMachine.switcher.forEach((switcher) => {
        const destinationSubStateDefinition =
          switcher.states[switcher.control.value];
        if (destinationSubStateDefinition) {
          this.fireEntryChild(
            destinationSubStateDefinition,
            subTreeObservables
          );
        }
      });
    }
  }
}
