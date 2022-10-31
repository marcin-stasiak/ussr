import { Test, TestingModule } from '@nestjs/testing';

import { ApplicationController } from './app.controller';

describe('ApplicationController', () => {
  let controller: ApplicationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApplicationController],
    }).compile();

    controller = module.get<ApplicationController>(ApplicationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

// import { Test, TestingModule } from '@nestjs/testing';
//
// import { SsrController } from './app.controller';
// import { SsrService } from './app.service';
//
// describe('AppController', () => {
//   let appController: SsrController;
//
//   beforeEach(async () => {
//     const app: TestingModule = await Test.createTestingModule({
//       controllers: [SsrController],
//       providers: [SsrService],
//     }).compile();
//
//     appController = app.get<SsrController>(SsrController);
//   });
//
//   describe('root', () => {
//     it('should return "Hello World!"', () => {
//       expect(appController.getHello()).toBe('Hello World!');
//     });
//   });
// });
