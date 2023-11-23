import { DEFAULT_LAYER_NAME } from 'layers/lib/constants/default-layer-name';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Marker from './Marker.entity';
import Map from './Map.entity';

@Entity('layer')
class Layer {
  @PrimaryGeneratedColumn('uuid', { name: 'layer_id' })
  id: string;

  @Column({ nullable: false, default: DEFAULT_LAYER_NAME })
  name: string;

  @OneToMany(() => Marker, (marker) => marker.layer)
  markers: Marker[];

  @ManyToOne(() => Map, (map) => map.layers, { onDelete: 'CASCADE' })
  map: Map;
}

export default Layer;
