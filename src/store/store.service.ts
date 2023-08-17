import { Injectable } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { Store } from './entities/store.entity';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

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

  async findAll() {
    return this.storeRepository.find();
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
