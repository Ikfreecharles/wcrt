import { persons } from 'testing/data';
import { getUniqueColor } from 'util/style';

describe('getUniqueColor', () => {
  test('UUID', () => {
    const colors = [...persons].map((person) => getUniqueColor(person.id));
    const uniqueColors = Array.from(new Set(colors));
    expect(colors).toEqual(uniqueColors);
  });
});
