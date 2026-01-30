import { TestBed } from '@angular/core/testing';

import { NodeGatewayService } from './node-gateway.service';

describe('NodeGatewayService', () => {
  let service: NodeGatewayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NodeGatewayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
