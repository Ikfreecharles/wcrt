import jwt from 'jsonwebtoken';
import dayjs from 'dayjs';

import { tokenNeedsRefresh } from 'util/server/auth';

describe('tokenNeedsRefresh', () => {
  test('undefined expiration time', () => {
    expect(tokenNeedsRefresh(jwt.sign({}, 'xyz'))).toBe(null);
  });

  test('acceptable expiration time', () => {
    expect(
      tokenNeedsRefresh(
        jwt.sign({ exp: dayjs().add(45, 'minute').unix() }, 'xyz')
      )
    ).toBe(false);
  });

  test('near future expiration time', () => {
    expect(
      tokenNeedsRefresh(
        jwt.sign({ exp: dayjs().add(15, 'minute').unix() }, 'xyz')
      )
    ).toBe(true);
  });

  test('immediate expiration time', () => {
    expect(tokenNeedsRefresh(jwt.sign({ exp: dayjs().unix() }, 'xyz'))).toBe(
      true
    );
  });

  test('past expiration time', () => {
    expect(
      tokenNeedsRefresh(
        jwt.sign({ exp: dayjs().subtract(10, 'minute').unix() }, 'xyz')
      )
    ).toBe(true);
  });
});
