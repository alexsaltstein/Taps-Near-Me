import getAge from '../getAge';

jest.mock('../getAge');

describe('age is calculated correctly', () => {

    test('21 years old is calculated for exact date', () => {
        expect(getAge('10312000')).toBe(21);
    });

    test('21 years old is calculated for near date', () => {
        expect(getAge('10292000')).toBe(21);
    });

    test('20 years old is calculated for near date', () => {
        expect(getAge('11012000')).toBe(20);
    })
})