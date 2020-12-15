import { TestBed } from '@angular/core/testing';

import { FormStateMachineService } from './form-state-machine.service';

describe('FormStateMachineService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormStateMachineService = TestBed.get(FormStateMachineService);
    expect(service).toBeTruthy();
  });
});
