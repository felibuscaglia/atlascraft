import { PLACE_TYPE } from 'places/lib/enums';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Marker from './Marker.entity';

@Entity('place')
class Place {
  @PrimaryGeneratedColumn('uuid', { name: 'place_id' })
  id: string;

  @Column({ unique: true, nullable: false, name: 'external_id' })
  externalId: string;

  @Column({ nullable: false })
  displayName: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, type: 'float' })
  latitude: number;

  @Column({ nullable: false, type: 'float' })
  longitude: number;

  @Column({ nullable: true, type: 'enum', enum: PLACE_TYPE })
  type: PLACE_TYPE;

  @OneToMany(() => Marker, (marker) => marker.place, { cascade: true })
  markers: Marker[];
}

export default Place;
