import fs from "fs";
import csv from "csv-parser";
import { AppDataSource } from "../data-source";
import { City } from "../entities/City";
import { Country } from "../entities/Country";

AppDataSource.initialize()
  .then(async () => {
    fs.createReadStream("./data/city.csv")
      .pipe(csv())
      .on("data", async (row) => {
        try {
          const countryId = parseInt(row.country_id);
          const country = await AppDataSource.manager.findOneBy(Country, { id: countryId });

          if (!country) {
            console.warn(`⚠️ Skipping city "${row.name}": Country with id ${countryId} not found.`);
            return;
          }

          const city = new City();
          city.name = row.name?.trim();
          city.lat = parseFloat(row.lat);
          city.long = parseFloat(row.long);
          city.is_active = row.is_active?.toLowerCase() === "true" || row.is_active === "1";
          city.country = country;

          await AppDataSource.manager.save(city);
          console.log(`✅ Imported city: ${city.name}`);
        } catch (err) {
          console.error("❌ Error importing city row:", row, err);
        }
      })
      .on("end", () => {
        console.log("🎉 Finished importing all city data.");
      });
  })
  .catch((error) => console.error("❌ DB Init Error:", error));
