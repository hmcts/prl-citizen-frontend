import { Pact } from '@pact-foundation/pact';
import config from 'config';
import { when } from 'jest-when';
import type { LoggerInstance } from 'winston';

import { getAddressesFromPostcode } from '../../main/app/postcode/postcode-lookup-api';
import { validPostcode200Response } from '../unit/utils/mockPostcodeResponses';

const provider = new Pact({
  consumer: 'prl-citizen-frontend',
  provider: 'postcode-lookup',
  logLevel: 'debug',
});

describe('postcode-lookup API', () => {
  const EXPECTED_ADDRESSES = [
    {
      fullAddress: 'BUCKINGHAM PALACE, LONDON, SW1A 1AA',
      street1: 'BUCKINGHAM PALACE',
      street2: '',
      town: 'LONDON',
      county: 'CITY OF WESTMINSTER',
      postcode: 'SW1A 1AA',
    },
    {
      fullAddress: 'THE STATE APARTMENTS, KENSINGTON PALACE, PALACE GREEN, LONDON, W1 2AB',
      street1: 'THE STATE APARTMENTS, KENSINGTON PALACE, PALACE GREEN',
      street2: '',
      town: 'LONDON',
      county: 'KENSINGTON AND CHELSEA',
      postcode: 'W1 2AB',
    },
    {
      fullAddress: '1, KENSINGTON PALACE GARDENS, LONDON, W1 2AB',
      street1: '1 KENSINGTON PALACE GARDENS',
      street2: '',
      town: 'LONDON',
      county: 'KENSINGTON AND CHELSEA',
      postcode: 'W1 2AB',
    },
    {
      fullAddress: '12345A, CHURCH ROAD, LITTLE BERKHAMSTED, HERTFORD, SG12 3AB',
      street1: '12345A, CHURCH ROAD',
      street2: 'LITTLE BERKHAMSTED',
      town: 'HERTFORD',
      county: 'EAST HERTFORDSHIRE',
      postcode: 'SG12 3AB',
    },
    {
      fullAddress: 'COMPANY LTD, UNIT 1234, SHINGLE HALL, TRIMMS GREEN, SAWBRIDGEWORTH, CM12 3AB',
      street1: 'COMPANY LTD, UNIT 1234, SHINGLE HALL',
      street2: 'TRIMMS GREEN',
      town: 'SAWBRIDGEWORTH',
      county: 'EAST HERTFORDSHIRE',
      postcode: 'CM12 3AB',
    },
    {
      fullAddress: 'BUILDING NAME, GREAT WOOD, THE RIDGEWAY, NORTHAW, POTTERS BAR, EN1 2AB',
      street1: 'BUILDING NAME, THE RIDGEWAY',
      street2: 'GREAT WOOD, NORTHAW, SNOWFIELD',
      town: 'POTTERS BAR',
      county: '',
      postcode: 'EN1 2AB',
    },
  ];

  it.skip('returns a successful body', async () => {
    await provider
      .addInteraction()
      .given('prl-citizen-frontend makes request to get addresses from postcode-lookup')
      .uponReceiving('a request for postcode lookup')
      .withRequest('GET', '/search/places/v1/postcode', request =>
        request
          .headers({
            accept: 'application/json',
          })
          .query({
            key: 'ssshhh',
            lr: 'EN',
            postcode: 'SW1A 1AB',
          })
      )
      .willRespondWith(200, response =>
        response.headers({ 'Content-Type': 'application/json' }).jsonBody({ results: validPostcode200Response.results })
      )
      .executeTest(async mockServer => {
        config.get = jest.fn();
        when(config.get)
          .calledWith('services.postcodeLookup.url')
          .mockReturnValue(`${mockServer.url}/search/places/v1`)
          .calledWith('services.postcodeLookup.token')
          .mockReturnValue('ssshhh');

        const { Logger } = require('@hmcts/nodejs-logging');
        const logger: LoggerInstance = Logger.getLogger('server');

        const addresses = await getAddressesFromPostcode('SW1A 1AB', logger);
        expect(addresses).toEqual(EXPECTED_ADDRESSES);
      });
  });
});
