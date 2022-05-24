import dayjs from 'dayjs';
import 'dayjs/locale/cy';

import { isDateInputInvalid } from '../../form/validation';
import type { CaseDate } from '../case';

export const getFormattedDate = (date: CaseDate | undefined, locale = 'en'): string =>
  date && !isDateInputInvalid(date)
    ? dayjs(`${date.day}-${date.month}-${date.year}`, 'D-M-YYYY').locale(locale).format('D MMMM YYYY')
    : '';
