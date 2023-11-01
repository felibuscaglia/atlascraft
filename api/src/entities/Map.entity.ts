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
import Marker from './Marker.entity';

@Entity('map')
class Map {
  @PrimaryGeneratedColumn('uuid', { name: 'map_id' })
  id: string;

  @Column({ nullable: false })
  name: string;

  @ManyToMany(() => User, (user) => user.maps)
  users: User[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Marker, (marker) => marker.map)
  markers: Marker[];
}

export default Map;
