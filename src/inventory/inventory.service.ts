import { Injectable } from '@nestjs/common';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { Inventory } from './entities/inventory.entity';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

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

  async findAll() {
    return this.inventoryRepository.find();
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
