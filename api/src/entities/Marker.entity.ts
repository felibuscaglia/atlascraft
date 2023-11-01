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

@Entity('marker')
class Marker {
  @PrimaryGeneratedColumn('uuid', { name: 'marker_id' })
  id: string;

  @Column({ nullable: true })
  customDisplayName?: string;

  @OneToOne(() => Place)
  @JoinColumn()
  place: Place;

  @ManyToOne(() => Map, (map) => map.markers)
  map: Map;
}

export default Marker;
