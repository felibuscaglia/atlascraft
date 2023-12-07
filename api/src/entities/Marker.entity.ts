import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Place from './Place.entity';
import Layer from './Layer.entity';
import { PRIMARY_BRAND_COLOR } from 'lib/constants';

@Entity('marker')
class Marker {
  @PrimaryGeneratedColumn('uuid', { name: 'marker_id' })
  id: string;

  @Column({ nullable: true })
  customDisplayName?: string;

  @Column({ nullable: true, default: PRIMARY_BRAND_COLOR })
  color: string;

  @OneToOne(() => Place, { onDelete: 'CASCADE' })
  @JoinColumn()
  place: Place;

  @ManyToOne(() => Layer, (layer) => layer.markers)
  layer: Layer;
}

export default Marker;
