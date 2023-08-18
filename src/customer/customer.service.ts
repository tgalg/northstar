import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

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

  async findAll() {
    return this.customerRepository.find();
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
