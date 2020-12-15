import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup } from "@angular/forms";
import { Subscription } from "rxjs";
import {
  FormStateMachine,
  FormStateMachineService,
} from "../form-state-machine.service";

enum MyShape {
  CIRCLE = "CIRCLE",
  SQUARE = "SQUARE",
  DIAMOND = "DIAMOND",
}

enum MyColor {
  RED = "RED",
  GREEN = "GREEN",
  BLUE = "BLUE",
}

enum MyLetter {
  A = "A",
  B = "B",
  C = "C",
}

@Component({
  selector: "app-shape",
  templateUrl: "./shape.component.html",
  styleUrls: ["./shape.component.scss"]
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
  shapeColorClass: string;

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
    });

    this.mymachine = {
      switcher: {
        control: this.formControlShape,
        states: {
          [MyShape.DIAMOND]: {
            entry: () => {
              console.log("MyShape.DIAMOND: onEnter");
              this.shapeVisibility = true;
            },
            exit: () => {
              console.log("MyShape.DIAMOND: onExit");
              this.shapeVisibility = false;
            },
            switcher: {
              control: this.formControlLetter,
              states: {
                [MyLetter.A]: {
                  entry: () => {
                    console.log("MyLetter.A: onEnter");
                    this.innerLetter = MyLetter.A;
                  },
                  exit: () => {
                    console.log("MyLetter.A: onExit");
                    this.innerLetter = undefined;
                  },
                },
                [MyLetter.B]: {
                  entry: () => {
                    console.log("MyLetter.B: onEnter");
                    this.innerLetter = MyLetter.B;
                  },
                  exit: () => {
                    console.log("MyLetter.B: onExit");
                    this.innerLetter = undefined;
                  },
                  switcher: {
                    control: this.formControlColor,
                    states: {
                      [MyColor.RED]: {
                        entry: () => {
                          console.log("MyColor.RED: onEnter");
                          this.shapeColorClass = "red";
                        },
                        exit: () => {
                          console.log("MyColor.RED: onExit");
                          this.shapeColorClass = null;
                        },
                      }
                    },
                  },
                },
              },
            },
          },
          [MyShape.CIRCLE]: {
            entry: () => {
              console.log("MyShape.CIRCLE: onEnter");
              this.shapeVisibility = true;
            },
            exit: () => {
              console.log("MyShape.CIRCLE: onExit");
              this.shapeVisibility = false;
            },
          },
          [MyShape.SQUARE]: {
            entry: () => {
              console.log("MyShape.SQUARE: onEnter");
              this.shapeVisibility = true;
            },
            exit: () => {
              console.log("MyShape.SQUARE: onExit");
              this.shapeVisibility = false;
            },
            switcher: {
              control: this.formControlLetter,
              states: {
                [MyLetter.A]: {
                  entry: () => {
                    console.log("MyLetter.A: onEnter");
                    this.innerLetter = MyLetter.A;
                  },
                  exit: () => {
                    console.log("MyLetter.A: onExit");
                    this.innerLetter = undefined;
                  },
                  switcher: {
                    control: this.formControlColor,
                    states: {
                      [MyColor.RED]: {
                        entry: () => {
                          console.log("MyColor.RED: onEnter");
                          this.shapeColorClass = "red";
                        },
                        exit: () => {
                          console.log("MyColor.RED: onExit");
                          this.shapeColorClass = null;
                        },
                      },
                      [MyColor.BLUE]: {
                        entry: () => {
                          console.log("MyColor.BLUE: onEnter");
                          this.shapeColorClass = "blue";
                        },
                        exit: () => {
                          console.log("MyColor.BLUE: onExit");
                          this.shapeColorClass = null;
                        },
                      },
                      [MyColor.GREEN]: {
                        entry: () => {
                          console.log("MyColor.GREEN: onEnter");
                          this.shapeColorClass = "green";
                        },
                        exit: () => {
                          console.log("MyColor.GREEN: onExit");
                          this.shapeColorClass = null;
                        },
                      },
                    },
                  },
                },
                [MyLetter.B]: {
                  entry: () => {
                    console.log("MyLetter.B: onEnter");
                    this.innerLetter = MyLetter.B;
                  },
                  exit: () => {
                    console.log("MyLetter.B: onExit");
                    this.innerLetter = undefined;
                  },
                  switcher: {
                    control: this.formControlColor,
                    states: {
                      [MyColor.RED]: {
                        entry: () => {
                          console.log("MyColor.RED: onEnter");
                          this.shapeColorClass = "red";
                        },
                        exit: () => {
                          console.log("MyColor.RED: onExit");
                          this.shapeColorClass = null;
                        },
                      },
                      [MyColor.BLUE]: {
                        entry: () => {
                          console.log("MyColor.BLUE: onEnter");
                          this.shapeColorClass = "blue";
                        },
                        exit: () => {
                          console.log("MyColor.BLUE: onExit");
                          this.shapeColorClass = null;
                        },
                      },
                      [MyColor.GREEN]: {
                        entry: () => {
                          console.log("MyColor.GREEN: onEnter");
                          this.shapeColorClass = "green";
                        },
                        exit: () => {
                          console.log("MyColor.GREEN: onExit");
                          this.shapeColorClass = null;
                        },
                      },
                    },
                  },
                },
                [MyLetter.C]: {
                  entry: () => {
                    console.log("MyLetter.C: onEnter");
                    this.innerLetter = MyLetter.C;
                  },
                  exit: () => {
                    console.log("MyLetter.C: onExit");
                    this.innerLetter = undefined;
                  },
                  switcher: {
                    control: this.formControlColor,
                    states: {
                      [MyColor.RED]: {
                        entry: () => {
                          console.log("MyColor.RED: onEnter");
                          this.shapeColorClass = "red";
                        },
                        exit: () => {
                          console.log("MyColor.RED: onExit");
                          this.shapeColorClass = null;
                        },
                      },
                      [MyColor.BLUE]: {
                        entry: () => {
                          console.log("MyColor.BLUE: onEnter");
                          this.shapeColorClass = "blue";
                        },
                        exit: () => {
                          console.log("MyColor.BLUE: onExit");
                          this.shapeColorClass = null;
                        },
                      },
                      [MyColor.GREEN]: {
                        entry: () => {
                          console.log("MyColor.GREEN: onEnter");
                          this.shapeColorClass = "green";
                        },
                        exit: () => {
                          console.log("MyColor.GREEN: onExit");
                          this.shapeColorClass = null;
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
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
        return "circle";
      case MyShape.SQUARE:
        return "square";
      case MyShape.DIAMOND:
        return "diamond";
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

  setColor(color: MyColor) {
    this.formControlColor.setValue(color);
  }

  get formControlShape(): AbstractControl {
    return this.myForm.get("shape");
  }

  get formControlLetter(): AbstractControl {
    return this.myForm.get("letter");
  }

  get formControlColor(): AbstractControl {
    return this.myForm.get("color");
  }
}
