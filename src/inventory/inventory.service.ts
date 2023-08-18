import { Injectable } from '@nestjs/common';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { Inventory } from './entities/inventory.entity';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/shared/dtos/pagination.dto';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Inventory)
    private readonly inventoryRepository: Repository<Inventory>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(createInventoryDto: CreateInventoryDto) {
    const inventory = new Inventory(createInventoryDto);
    await this.entityManager.save(inventory);
  }

  async findAll(paginationDto: PaginationDto) {
    const { page = 1, perPage = 10 } = paginationDto;

    const skip = (page - 1) * perPage;
    const take = perPage;

    return this.inventoryRepository
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
    return this.inventoryRepository.findOneBy({ inventory_id: id });
  }

  async update(id: number, updateInventoryDto: UpdateInventoryDto) {
    const inventory = await this.inventoryRepository.findOneBy({
      inventory_id: id,
    });
    inventory.inventory_name = updateInventoryDto.inventory_name;
    inventory.available_quantity = updateInventoryDto.available_quantity;
    await this.entityManager.save(inventory);
  }

  async remove(id: number) {
    await this.inventoryRepository.delete({ inventory_id: id });
  }
}
