import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/shared/dtos/pagination.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const order = new Order();
    Object.assign(order, createOrderDto);
    await this.entityManager.save(order);
  }

  async findAll(paginationDto: PaginationDto) {
    const { page = 1, perPage = 10 } = paginationDto;

    const skip = (page - 1) * perPage;
    const take = perPage;

    return this.orderRepository
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
    return this.orderRepository.findOneBy({ order_id: id });
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    await this.orderRepository.update(id, updateOrderDto);
  }

  async remove(id: number) {
    await this.orderRepository.delete(id);
  }
}
