import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/shared/dtos/pagination.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(createCustomerDto: CreateCustomerDto) {
    const customer = new Customer(createCustomerDto);
    await this.entityManager.save(customer);
  }

  async findAll(paginationDto: PaginationDto) {
    const { page = 1, perPage = 10 } = paginationDto;

    const skip = (page - 1) * perPage;
    const take = perPage;

    return this.customerRepository
      .findAndCount({
        skip,
        take,
        // order: { ... } // order condition, if required.
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
    return this.customerRepository.findOneBy({ customer_id: id });
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    const customer = await this.customerRepository.findOneBy({
      customer_id: id,
    });

    customer.customer_name = updateCustomerDto.customer_name;
    await this.entityManager.save(customer);
  }

  async remove(id: number) {
    await this.customerRepository.delete({ customer_id: id });
  }
}
