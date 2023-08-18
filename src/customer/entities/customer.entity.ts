import { Order } from 'src/order/entities/order.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('customers')
export class Customer {
  @PrimaryGeneratedColumn()
  customer_id: number;

  @Column()
  customer_name: string;

  @OneToMany(() => Order, (order) => order.customer, {
    lazy: true,
  })
  orders: Promise<Order[]>;

  constructor(customer: Partial<Customer>) {
    Object.assign(this, customer);
  }
}
