import { Injectable } from "@angular/core";
import { AbstractControl } from "@angular/forms";
import { EMPTY, merge, Observable } from "rxjs";
import {
  distinctUntilChanged,
  map,
  pairwise,
  startWith,
  switchMap,
} from "rxjs/operators";

export interface FormStateMachine {
  entry?: () => void;
  exit?: () => void;
  switcher?: Switcher;
}

export interface Switcher {
  control: AbstractControl;
  states: { [key: string]: FormStateMachine };
}

@Injectable({
  providedIn: "root",
})
export class FormStateMachineService {
  constructor() {}

  getFormStateObservable(stateDefinition: FormStateMachine): Observable<any> {
    // Tutaj następuje przerwanie wywołań
    if (!stateDefinition || !stateDefinition.switcher) {
      return EMPTY;
    }

    const switcher = stateDefinition.switcher;

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

  private fireExitChild(currentStateDefinition) {
    if (currentStateDefinition && currentStateDefinition.switcher) {
      const switcher = currentStateDefinition.switcher;
      const currentSubStateDefinition = switcher.states[switcher.control.value];

      // rekurencja - exit następuje zaczynając od dzieci
      if (currentSubStateDefinition) {
        this.fireExitChild(currentSubStateDefinition);
      }
    }

    if (currentStateDefinition && currentStateDefinition.exit) {
      currentStateDefinition.exit();
    }
  }

  private fireEntryChild(destinationStateDefinition, subTreeObservables) {
    if (destinationStateDefinition && destinationStateDefinition.entry) {
      destinationStateDefinition.entry();
    }
    if (destinationStateDefinition && destinationStateDefinition.switcher) {
      const switcher = destinationStateDefinition.switcher;
      const destinationSubStateDefinition =
        switcher.states[switcher.control.value];
      subTreeObservables.push(
        this.getFormStateObservable(destinationStateDefinition)
      );
      if (destinationSubStateDefinition) {
        this.fireEntryChild(destinationSubStateDefinition, subTreeObservables);
      }
    }
  }
}
