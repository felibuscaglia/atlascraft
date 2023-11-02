import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import User from './User.entity';
import Layer from './Layer.entity';

@Entity('map')
class Map {
  @PrimaryGeneratedColumn('uuid', { name: 'map_id' })
  id: string;

  @Column({ nullable: false })
  name: string;

  @ManyToMany(() => User, (user) => user.maps, { onDelete: 'CASCADE' })
  users: User[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Layer, (layer) => layer.map)
  layers: Layer[];
}

export default Map;
