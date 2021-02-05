import { Test, TestingModule } from '@nestjs/testing';
import { StaticFilesController } from './staticFiles.controller';
import { StaticFilesService } from './StaticFiles.service';


describe('AppController', () => {
  let staticFilesController: StaticFilesController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [StaticFilesController],
      providers: [StaticFilesService],
    }).compile();

    staticFilesController = app.get<StaticFilesController>(StaticFilesController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(staticFilesController.getHello()).toBe('Hello World!');
    });
  });
});
