import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}

export default Place;
