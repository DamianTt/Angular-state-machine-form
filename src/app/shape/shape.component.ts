import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import {
  FormStateMachine,
  FormStateMachineService,
} from '../form-state-machine.service';

enum MyShape {
  CIRCLE = 'CIRCLE',
  SQUARE = 'SQUARE',
  DIAMOND = 'DIAMOND',
}

enum MyColor {
  RED = 'RED',
  GREEN = 'GREEN',
  BLUE = 'BLUE',
}

enum MyLetter {
  A = 'A',
  B = 'B',
  C = 'C',
}

@Component({
  selector: 'app-shape',
  templateUrl: './shape.component.html',
  styleUrls: ['./shape.component.scss'],
})
export class ShapeComponent implements OnInit, OnDestroy {
  // Enums for template
  MyShape = MyShape;
  MyColor = MyColor;
  MyLetter = MyLetter;

  private subscriptions = new Subscription();

  mymachine: FormStateMachine;

  myForm: FormGroup;

  shapeVisibility: boolean;
  innerLetter: string;
  innerNumber: Number;
  shapeColorClass: string;
  shapeShadowClass: string;

  @ViewChild('graphContainer', { read: ElementRef }) graphContainer: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private formStateMachineService: FormStateMachineService
  ) {}

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      shape: undefined,
      color: undefined,
      letter: undefined,
      number: undefined,
      shadow: undefined,
    });

    this.mymachine = {
      switcher: [
        {
          control: this.formControlShape,
          states: {
            [MyShape.DIAMOND]: {
              entry: () => {
                console.log('MyShape.DIAMOND: onEnter');
                this.shapeVisibility = true;
              },
              exit: () => {
                console.log('MyShape.DIAMOND: onExit');
                this.shapeVisibility = false;
              },
              switcher: [
                {
                  control: this.formControlLetter,
                  states: {
                    [MyLetter.A]: {
                      entry: () => {
                        console.log('MyLetter.A: onEnter');
                        this.innerLetter = MyLetter.A;
                      },
                      exit: () => {
                        console.log('MyLetter.A: onExit');
                        this.innerLetter = undefined;
                      },
                    },
                    [MyLetter.B]: {
                      entry: () => {
                        console.log('MyLetter.B: onEnter');
                        this.innerLetter = MyLetter.B;
                      },
                      exit: () => {
                        console.log('MyLetter.B: onExit');
                        this.innerLetter = undefined;
                      },
                      switcher: [
                        {
                          control: this.formControlColor,
                          states: {
                            [MyColor.RED]: {
                              entry: () => {
                                console.log('MyColor.RED: onEnter');
                                this.shapeColorClass = 'red';
                              },
                              exit: () => {
                                console.log('MyColor.RED: onExit');
                                this.shapeColorClass = null;
                              },
                            },
                          },
                        },
                      ],
                    },
                  },
                },
                {
                  control: this.formControlNumber,
                  states: {
                    1: {
                      entry: () => {
                        console.log('*** MyNumber: 1: onEnter');
                        this.innerNumber = 1;
                      },
                      exit: () => {
                        console.log('*** MyNumber: 1: onExit');
                        this.innerNumber = null;
                      },
                    },
                  },
                },
              ],
            },
            [MyShape.CIRCLE]: {
              entry: () => {
                console.log('MyShape.CIRCLE: onEnter');
                this.shapeVisibility = true;
              },
              exit: () => {
                console.log('MyShape.CIRCLE: onExit');
                this.shapeVisibility = false;
              },
            },
            [MyShape.SQUARE]: {
              entry: () => {
                console.log('MyShape.SQUARE: onEnter');
                this.shapeVisibility = true;
              },
              exit: () => {
                console.log('MyShape.SQUARE: onExit');
                this.shapeVisibility = false;
              },
              switcher: [
                {
                  control: this.formControlLetter,
                  states: {
                    [MyLetter.A]: {
                      entry: () => {
                        console.log('MyLetter.A: onEnter');
                        this.innerLetter = MyLetter.A;
                      },
                      exit: () => {
                        console.log('MyLetter.A: onExit');
                        this.innerLetter = undefined;
                      },
                      switcher: [
                        {
                          control: this.formControlColor,
                          states: {
                            [MyColor.RED]: {
                              entry: () => {
                                console.log('MyColor.RED: onEnter');
                                this.shapeColorClass = 'red';
                              },
                              exit: () => {
                                console.log('MyColor.RED: onExit');
                                this.shapeColorClass = null;
                              },
                            },
                            [MyColor.BLUE]: {
                              entry: () => {
                                console.log('MyColor.BLUE: onEnter');
                                this.shapeColorClass = 'blue';
                              },
                              exit: () => {
                                console.log('MyColor.BLUE: onExit');
                                this.shapeColorClass = null;
                              },
                            },
                            [MyColor.GREEN]: {
                              entry: () => {
                                console.log('MyColor.GREEN: onEnter');
                                this.shapeColorClass = 'green';
                              },
                              exit: () => {
                                console.log('MyColor.GREEN: onExit');
                                this.shapeColorClass = null;
                              },
                            },
                          },
                        },
                      ],
                    },
                    [MyLetter.B]: {
                      entry: () => {
                        console.log('MyLetter.B: onEnter');
                        this.innerLetter = MyLetter.B;
                      },
                      exit: () => {
                        console.log('MyLetter.B: onExit');
                        this.innerLetter = undefined;
                      },
                      switcher: [
                        {
                          control: this.formControlColor,
                          states: {
                            [MyColor.RED]: {
                              entry: () => {
                                console.log('MyColor.RED: onEnter');
                                this.shapeColorClass = 'red';
                              },
                              exit: () => {
                                console.log('MyColor.RED: onExit');
                                this.shapeColorClass = null;
                              },
                            },
                            [MyColor.BLUE]: {
                              entry: () => {
                                console.log('MyColor.BLUE: onEnter');
                                this.shapeColorClass = 'blue';
                              },
                              exit: () => {
                                console.log('MyColor.BLUE: onExit');
                                this.shapeColorClass = null;
                              },
                            },
                            [MyColor.GREEN]: {
                              entry: () => {
                                console.log('MyColor.GREEN: onEnter');
                                this.shapeColorClass = 'green';
                              },
                              exit: () => {
                                console.log('MyColor.GREEN: onExit');
                                this.shapeColorClass = null;
                              },
                            },
                          },
                        },
                      ],
                    },
                    [MyLetter.C]: {
                      entry: () => {
                        console.log('MyLetter.C: onEnter');
                        this.innerLetter = MyLetter.C;
                      },
                      exit: () => {
                        console.log('MyLetter.C: onExit');
                        this.innerLetter = undefined;
                      },
                      switcher: [
                        {
                          control: this.formControlColor,
                          states: {
                            [MyColor.RED]: {
                              entry: () => {
                                console.log('MyColor.RED: onEnter');
                                this.shapeColorClass = 'red';
                              },
                              exit: () => {
                                console.log('MyColor.RED: onExit');
                                this.shapeColorClass = null;
                              },
                            },
                            [MyColor.BLUE]: {
                              entry: () => {
                                console.log('MyColor.BLUE: onEnter');
                                this.shapeColorClass = 'blue';
                              },
                              exit: () => {
                                console.log('MyColor.BLUE: onExit');
                                this.shapeColorClass = null;
                              },
                            },
                            [MyColor.GREEN]: {
                              entry: () => {
                                console.log('MyColor.GREEN: onEnter');
                                this.shapeColorClass = 'green';
                              },
                              exit: () => {
                                console.log('MyColor.GREEN: onExit');
                                this.shapeColorClass = null;
                              },
                              switcher: [
                                {
                                  control: this.formControlShadow,
                                  states: {
                                    [MyColor.RED]: {
                                      entry: () => {
                                        console.log('MyShadow.RED: onEnter');
                                        this.shapeShadowClass = 'shadow-red';
                                      },
                                      exit: () => {
                                        console.log('MyShadow.RED: onExit');
                                        this.shapeShadowClass = null;
                                      },
                                    },
                                    [MyColor.BLUE]: {
                                      entry: () => {
                                        console.log('MyShadow.BLUE: onEnter');
                                        this.shapeShadowClass = 'shadow-blue';
                                      },
                                      exit: () => {
                                        console.log('MyShadow.BLUE: onExit');
                                        this.shapeShadowClass = null;
                                      },
                                    },
                                    [MyColor.GREEN]: {
                                      entry: () => {
                                        console.log('MyShadow.GREEN: onEnter');
                                        this.shapeShadowClass = 'shadow-green';
                                      },
                                      exit: () => {
                                        console.log('MyShadow.GREEN: onExit');
                                        this.shapeShadowClass = null;
                                      },
                                    },
                                  },
                                },
                              ],
                            },
                          },
                        },
                      ],
                    },
                  },
                },
                {
                  control: this.formControlNumber,
                  states: {
                    1: {
                      entry: () => {
                        console.log('*** MyNumber: 1: onEnter');
                        this.innerNumber = 1;
                      },
                      exit: () => {
                        console.log('*** MyNumber: 1: onExit');
                        this.innerNumber = null;
                      },
                    },
                    2: {
                      entry: () => {
                        console.log('*** MyNumber: 2: onEnter');
                        this.innerNumber = 2;
                      },
                      exit: () => {
                        console.log('*** MyNumber: 2: onExit');
                        this.innerNumber = null;
                      },
                    },
                    3: {
                      entry: () => {
                        console.log('*** MyNumber: 3: onEnter');
                        this.innerNumber = 3;
                      },
                      exit: () => {
                        console.log('*** MyNumber: 3: onExit');
                        this.innerNumber = null;
                      },
                    },
                  },
                },
              ],
            },
          },
        },
      ],
    };

    this.subscriptions.add(
      this.formStateMachineService
        .getFormStateObservable(this.mymachine)
        .subscribe()
    );
  }

  getShapeClass(): string {
    switch (this.formControlShape.value) {
      case MyShape.CIRCLE:
        return 'circle';
      case MyShape.SQUARE:
        return 'square';
      case MyShape.DIAMOND:
        return 'diamond';
      default:
        return null;
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  setShape(shape: MyShape) {
    this.formControlShape.setValue(shape);
  }

  setLetter(letter: MyLetter) {
    this.formControlLetter.setValue(letter);
  }

  setNumber(number: Number) {
    this.formControlNumber.setValue(number);
  }

  setColor(color: MyColor) {
    this.formControlColor.setValue(color);
  }

  setShadow(color: MyColor) {
    this.formControlShadow.setValue(color);
  }

  get formControlShape(): AbstractControl {
    return this.myForm.get('shape');
  }

  get formControlLetter(): AbstractControl {
    return this.myForm.get('letter');
  }

  get formControlNumber(): AbstractControl {
    return this.myForm.get('number');
  }

  get formControlColor(): AbstractControl {
    return this.myForm.get('color');
  }

  get formControlShadow(): AbstractControl {
    return this.myForm.get('shadow');
  }
}
