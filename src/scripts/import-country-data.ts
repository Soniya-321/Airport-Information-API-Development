import fs from "fs";
import csv from "csv-parser";
import { AppDataSource } from "../data-source";
import { Country } from "../entities/Country";

AppDataSource.initialize()
  .then(async () => {
    fs.createReadStream("./data/country.csv")
      .pipe(csv())
      .on("data", async (row) => {
        try {
          const country = new Country();

          country.id = parseInt(row.id); // Explicitly set ID
          country.name = row.name?.trim();
          country.country_code_two = row.country_code_two?.trim();
          country.country_code_three = row.country_code_three?.trim();
          country.mobile_code = parseInt(row.mobile_code);
          country.continent_id = parseInt(row.continent_id);

          await AppDataSource.manager.save(Country, country);
          console.log(`✅ Imported country: ${country.name}`);
        } catch (err) {
          console.error("❌ Error importing country row:", row, err);
        }
      })
      .on("end", () => {
        console.log("🎉 Finished importing country data.");
      });
  })
  .catch((error) => console.error("❌ DB Init Error:", error));
