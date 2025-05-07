// src/entities/Airport.ts

import { Entity, PrimaryGeneratedColumn, Column,JoinColumn, ManyToOne } from "typeorm";
import { City } from "./City";

@Entity()
export class Airport {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  icao_code: string;

  @Column()
  iata_code: string;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column('float')
  latitude_deg: number;

  @Column('float')
  longitude_deg: number;

  @Column()
  elevation_ft: number;

  @ManyToOne(() => City, city => city.airports)
  @JoinColumn({ name: 'city_id' })
  city: City;
}
