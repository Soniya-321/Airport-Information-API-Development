// src/controllers/airport.controller.ts
import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Airport } from '../entities/Airport';

export const getAirportByIataCode = async (req: Request, res: Response): Promise<Response> => {
  const { iata_code } = req.params;

  try {
    const airport = await AppDataSource.getRepository(Airport).findOne({
      where: { iata_code },
      relations: ['city', 'city.country'],
    });

    if (!airport) {
      return res.status(404).json({ message: 'Airport not found' });
    }

    // return res.json({message: "Success"});
    return res.json({
      airport: {
        id: airport.id,
        icao_code: airport.icao_code,
        iata_code: airport.iata_code,
        name: airport.name,
        type: airport.type,
        latitude_deg: airport.latitude_deg,
        longitude_deg: airport.longitude_deg,
        elevation_ft: airport.elevation_ft,
        address: {
          city: airport.city && {
            id: airport.city.id,
            name: airport.city.name,
            country_id: airport.city.country.id,
            is_active: airport.city.is_active,
            lat: airport.city.lat,
            long: airport.city.long,
          },
          country: airport.city?.country
            ? {
                id: airport.city.country.id,
                name: airport.city.country.name,
                country_code_two: airport.city.country.country_code_two,
                country_code_three: airport.city.country.country_code_three,
                mobile_code: airport.city.country.mobile_code,
                continent_id: airport.city.country.continent_id,
              }
            : null,
        },
      },
    });
  } catch (error) {
    console.error('❌ Error fetching airport data:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
