import { generateHearingTimeDisplayText } from "./utils";

describe('Generate hearing time display text', () => {

    test('should return time with offset when in BST', () => {
        const date = new Date('2023-07-11T10:30:00Z');
        const result = generateHearingTimeDisplayText(date);
        expect(result).toBe('11:30 am');
    });

    test('should return time without offset when in GMT', () => {
        const date = new Date('2023-01-15T14:30:00Z');
        const result = generateHearingTimeDisplayText(date);
        expect(result).toBe('2:30 pm');
    });
});