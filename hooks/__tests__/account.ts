import { renderHook, fetchData, TestingContext } from 'testing/util';
import { FieldError } from 'lib/error';
import {
  useAccountContactSubmit,
  useAccountPasswordSubmit,
} from 'hooks/account';

describe('useAccountContactSubmit', () => {
  test('API call', async () => {
    const { result } = renderHook(() => useAccountContactSubmit(), {
      wrapper: TestingContext,
    });
    await result.current({
      email: 'new@example.com',
      currentPassword: '123',
    });
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('/api/auth/update/email', {
      body: JSON.stringify({
        email: 'new@example.com',
        currentPassword: '123',
      }),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    });
  });

  test('response validation', async () => {
    fetchData.error = { type: 'INVALID_VALUE', fields: ['email'] };
    const { result } = renderHook(() => useAccountContactSubmit(), {
      wrapper: TestingContext,
    });
    await expect(
      result.current({
        email: 'new@example.com',
        currentPassword: '123',
      })
    ).rejects.toThrow(FieldError);
  });
});

describe('useAccountPasswordSubmit', () => {
  test('API call', async () => {
    const { result } = renderHook(() => useAccountPasswordSubmit(), {
      wrapper: TestingContext,
    });
    await result.current({
      currentPassword: '123',
      newPassword: '456',
      passwordConfirmation: '456',
    });
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('/api/auth/update/password', {
      body: JSON.stringify({
        currentPassword: '123',
        newPassword: '456',
        passwordConfirmation: '456',
      }),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    });
  });

  test('response validation', async () => {
    fetchData.error = { type: 'INVALID_VALUE', fields: ['currentPassword'] };
    const { result } = renderHook(() => useAccountPasswordSubmit(), {
      wrapper: TestingContext,
    });
    await expect(
      result.current({
        currentPassword: '123',
        newPassword: '456',
        passwordConfirmation: '456',
      })
    ).rejects.toThrow(FieldError);
  });
});
