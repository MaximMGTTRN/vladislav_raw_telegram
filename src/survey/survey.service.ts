import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cache } from 'cache-manager';
import { Person } from 'src/entities/Person.entity';
import { Survey } from 'src/entities/Surveys.entity';
import { Repository } from 'typeorm';


@Injectable()
export class SurveyService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectRepository(Person) private readonly personRep: Repository<Person>,
    @InjectRepository(Survey) private readonly surveyRep: Repository<Survey>,
  ) { }
}


// {
//   id: 179897275,
//   is_bot: false,
//   first_name: 'Анастасия',
//   username: 'skylark88',
//   language_code: 'ru'
// } personNamepersonName
