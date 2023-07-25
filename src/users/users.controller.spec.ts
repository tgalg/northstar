import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

describe('UsersController', () => {
  let controller: UsersController;

  const mockUser: User = {
    id: 1,
    email: 'example@traderinteractive.com',
    name: 'Example User',
  };

  const mockUsersService = {
    findAll: jest.fn((): User[] => [mockUser]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
      imports: [],
    })
      .overrideProvider(UsersService)
      .useValue(mockUsersService)
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('FindAll', () => {
    it('findAll should be defined', () => {
      expect(controller.findAll).toBeDefined();
    });

    it('should call usersService.findAll', async () => {
      expect(await controller.findAll()).toEqual([mockUser]);
      expect(mockUsersService.findAll).toHaveBeenCalled();
    });
  });
});
