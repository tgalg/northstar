import { Order } from 'src/order/entities/order.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('stores')
export class Store {
  @PrimaryGeneratedColumn()
  store_id: number;

  @Column()
  store_address: string;

  @Column()
  store_manager_name: string;

  @OneToMany(() => Order, (order) => order.store, {
    lazy: true,
  })
  orders: Promise<Order[]>;

  constructor(store: Partial<Store>) {
    Object.assign(this, store);
  }
}
