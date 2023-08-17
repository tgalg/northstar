import { Order } from 'src/order/entities/order.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('inventories')
export class Inventory {
  @PrimaryGeneratedColumn()
  inventory_id: number;

  @Column()
  inventory_name: string;

  @Column({ type: 'date' })
  manufacture_date: Date;

  @Column({ type: 'int' })
  available_quantity: number;

  @OneToMany(() => Order, (order) => order.inventory, {
    lazy: true,
  })
  orders: Promise<Order[]>;

  constructor(inventory: Partial<Inventory>) {
    Object.assign(this, inventory);
  }
}
