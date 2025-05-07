import { Router } from 'express';
import { getAirportByIataCode } from '../controllers/airportController';

const router = Router();

router.get('/airport/:iata_code', getAirportByIataCode);

export default router;