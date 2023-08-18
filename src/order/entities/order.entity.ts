import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Customer } from 'src/customer/entities/customer.entity';
import { Inventory } from 'src/inventory/entities/inventory.entity';
import { Store } from 'src/store/entities/store.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  order_id: number;

  @ManyToOne(() => Customer, (customer) => customer.orders, {
    cascade: true,
    lazy: true,
  })
  @JoinColumn({ name: 'customer_id' })
  customer: Promise<Customer>;

  @ManyToOne(() => Inventory, (inventory) => inventory.orders, {
    cascade: true,
    lazy: true,
  })
  @JoinColumn({ name: 'inventory_id' })
  inventory: Promise<Inventory>;

  @ManyToOne(() => Store, (store) => store.orders, {
    cascade: true,
    lazy: true,
  })
  @JoinColumn({ name: 'store_id' })
  store: Promise<Store>;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ default: 'pending' })
  status: string;

  @CreateDateColumn()
  create_date: Date;

  @UpdateDateColumn()
  update_date: Date;
}
