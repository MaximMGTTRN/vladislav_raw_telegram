import * as dotenv from 'dotenv';


dotenv.config();

export const ADMINS_IDS = {
  VLAD_ID: +process.env.VLAD_ID,
  MAKS_ID: +process.env.MAKS_ID,
};
