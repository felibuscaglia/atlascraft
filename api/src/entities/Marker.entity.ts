import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Place from './Place.entity';
import Map from './Map.entity';
import Layer from './Layer.entity';

@Entity('marker')
class Marker {
  @PrimaryGeneratedColumn('uuid', { name: 'marker_id' })
  id: string;

  @Column({ nullable: true })
  customDisplayName?: string;

  @OneToOne(() => Place)
  @JoinColumn()
  place: Place;

  @ManyToOne(() => Layer, (layer) => layer.markers)
  layer: Layer;
}

export default Marker;
