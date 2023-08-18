import { Injectable } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { Store } from './entities/store.entity';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/shared/dtos/pagination.dto';

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(Store)
    private readonly storeRepository: Repository<Store>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(createStoreDto: CreateStoreDto) {
    const store = new Store(createStoreDto);
    await this.entityManager.save(store);
  }

  async findAll(paginationDto: PaginationDto) {
    const { page = 1, perPage = 10 } = paginationDto;

    const skip = (page - 1) * perPage;
    const take = perPage;

    return this.storeRepository
      .findAndCount({
        skip,
        take,
      })
      .then(([result, total]) => {
        return {
          pagination: {
            page,
            perPage,
            total,
          },
          result,
        };
      });
  }

  async findOne(id: number) {
    return this.storeRepository.findOneBy({ store_id: id });
  }

  async update(id: number, updateStoreDto: UpdateStoreDto) {
    const store = await this.storeRepository.findOneBy({ store_id: id });
    // You can add any properties from UpdateStoreDto to update here
    store.store_address = updateStoreDto.store_address;
    store.store_manager_name = updateStoreDto.store_manager_name;

    await this.entityManager.save(store);
  }

  async remove(id: number) {
    await this.storeRepository.delete({ store_id: id });
  }
}
