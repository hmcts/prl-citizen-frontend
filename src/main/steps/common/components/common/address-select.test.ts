import { FormContent, FormFields, FormOptions } from '../../../../app/form/Form';
import { isAddressSelected } from '../../../../app/form/validation';
import { CommonContent} from '../../../common/common.content';

import { generateContent } from './address-select';

jest.mock('../../../../app/form/validation');


const enContent = {
  line1:
    "We'll send all court papers to this address unless you advise us that you are happy to be served court orders by email.",
  postcode: 'Postcode',
  selectAddress: 'Select an address',
  cannotFindAddress: 'Or enter address manually',
  errors: {
    selectAddress: {
      notSelected: 'Select an address',
    },
  },
  changePostCodeUrl: '#',
  cantFindAddressUrl: '#',
};

const cyContent = {
  line1:
    'Byddwn yn anfon yr holl bapurau llys i’r cyfeiriad hwn oni bai eich bod yn ein cynghori eich bod yn hapus i’r gorchmynion llys gael eu cyflwyno arnoch trwy e-bost.',
  postcode: 'Cod post',
  selectAddress: 'Dewiswch gyfeiriad',
  cannotFindAddress: 'Neu nodwch y cyfeiriad â llaw',
  errors: {
    selectAddress: {
      notSelected: 'Dewiswch gyfeiriad',
    },
  },
  changePostCodeUrl: '#',
  cantFindAddressUrl: '#',
};

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('common > components > address-select', () => {
  const commonContent = { language: 'en', userCase: {}, addresses: [] as any[] } as unknown as CommonContent;
  let generatedContent;

  beforeEach(() => {
    generatedContent = generateContent(commonContent);
  });

  test('should return correct english content', () => {
    //expect(generatedContent.line1).toEqual(enContent.line1);
    expect(generatedContent.postcode).toEqual(enContent.postcode);
    expect(generatedContent.selectAddress).toEqual(enContent.selectAddress);
    expect(generatedContent.cannotFindAddress).toEqual(enContent.cannotFindAddress);

    expect(generatedContent.errors).toEqual({
      selectAddress: {
        notSelected: 'Select an address',
      },
    });

    expect(generatedContent.options).toEqual([
      { attributes: { id: 'totalAddressesFound' }, selected: true, text: '0 addresses found', value: -1 },
    ]);

    expect(generatedContent.changePostCodeUrl).toEqual('#');
    expect(generatedContent.cantFindAddressUrl).toEqual('#');
  });

  test('should return correct welsh content', () => {
    generatedContent = generateContent({ ...commonContent, language: 'cy' });
    //expect(generatedContent.line1).toEqual(cyContent.line1);
    expect(generatedContent.postcode).toEqual(cyContent.postcode);
    expect(generatedContent.selectAddress).toEqual(cyContent.selectAddress);
    expect(generatedContent.cannotFindAddress).toEqual(cyContent.cannotFindAddress);

    expect(generatedContent.errors).toEqual({
      selectAddress: {
        notSelected: 'Dewiswch gyfeiriad',
      },
    });

    expect(generatedContent.options).toEqual([
      { attributes: { id: 'totalAddressesFound' }, selected: true, text: '0 cyfeiriadau wedi’i ddarganfod', value: -1 },
    ]);

    expect(generatedContent.changePostCodeUrl).toEqual('#');
    expect(generatedContent.cantFindAddressUrl).toEqual('#');
  });

  // describe('when there is one address in session', () => {
  //   test('should create correct options for selectAddress field', () => {
  //     generatedContent = generateContent({ ...commonContent, addresses: [{ fullAddress: 'MOCK_FULL_ADDRESS_1' }] });
  //     expect(generatedContent.options).toEqual([
  //       { attributes: { id: 'totalAddressesFound' }, selected: true, text: '1 address found', value: -1 },
  //       { text: 'MOCK_FULL_ADDRESS_1', value: 0 },
  //     ]);
  //   });

  //   test('should create correct options for selectAddress field (welsh)', () => {
  //     generatedContent = generateContent({
  //       ...commonContent,
  //       language: 'cy',
  //       addresses: [{ fullAddress: 'MOCK_FULL_ADDRESS_1' }],
  //     });
  //     expect(generatedContent.options).toEqual([
  //       { attributes: { id: 'totalAddressesFound' }, selected: true, text: '1 cyfeiriad wedi’i ddarganfod', value: -1 },
  //       { text: 'MOCK_FULL_ADDRESS_1', value: 0 },
  //     ]);
  //   });
  // });

  // describe('when there addresses is undefined in session', () => {
  //   test('should create correct options for selectAddress field', () => {
  //     generatedContent = generateContent({ ...commonContent, addresses: undefined });
  //     expect(generatedContent.options).toEqual([
  //       { attributes: { id: 'totalAddressesFound' }, selected: true, text: '0 addresses found', value: -1 },
  //     ]);
  //   });

  //   test('should create correct options for selectAddress field (welsh)', () => {
  //     generatedContent = generateContent({ ...commonContent, language: 'cy', addresses: undefined });
  //     expect(generatedContent.options).toEqual([
  //       {
  //         attributes: { id: 'totalAddressesFound' },
  //         selected: true,
  //         text: '0 cyfeiriadau wedi’i ddarganfod',
  //         value: -1,
  //       },
  //     ]);
  //   });
  // });

  test('should contain selectAddress field', () => {
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const selectAddressField = fields.selectAddress as FormOptions;

    expect(selectAddressField.type).toBe('select');
    expect((selectAddressField.label as Function)(generatedContent)).toBe('Select an address');
    expect(selectAddressField.labelSize).toBe('m');
    expect(selectAddressField.validator).toBe(isAddressSelected);
  });

  // test('should contain submit button', () => {
  //   const form = generatedContent.form as FormContent;
  //   expect((form.submit.text as Function)(generatePageContent({ language: 'en' }))).toBe('Save and continue');
  // });

  // test('should contain saveAsDraft button', () => {
  //   const form = generatedContent.form as FormContent;
  //   expect((form.saveAsDraft?.text as Function)(generatePageContent({ language: 'en' }))).toBe('Save as draft');
  // });
});
/* eslint-enable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
