import { renderHook, TestingContext, act } from 'testing/util';
import { FieldError } from 'lib/error';
import { useFormStatus, useFormErrorHandling } from 'hooks/form';

describe('useFormStatus', () => {
  const handleFormCompletion = jest.fn();

  test('initial state', () => {
    const { result } = renderHook(() => useFormStatus(), {
      wrapper: TestingContext,
    });
    expect(result.current.formStatus).toBe(undefined);
    expect(result.current.formResult).toBe(undefined);
  });

  test('status update', () => {
    const { result } = renderHook(() => useFormStatus(), {
      wrapper: TestingContext,
    });
    act(() => result.current.setFormStatus('submitting'));
    expect(result.current.formStatus).toBe('submitting');
  });

  test('result update', () => {
    const { result } = renderHook(() => useFormStatus(), {
      wrapper: TestingContext,
    });
    act(() =>
      result.current.setFormResult({ data: { commentId: 'T:123:Comment' } })
    );
    expect(result.current.formResult).toEqual({
      data: { commentId: 'T:123:Comment' },
    });
  });

  test('callback definition', () => {
    const { result } = renderHook(() => useFormStatus(handleFormCompletion), {
      wrapper: TestingContext,
    });
    act(() => result.current.setFormStatus('submitting'));
    expect(handleFormCompletion).toHaveBeenCalledTimes(0);
  });

  test('callback execution', () => {
    const { result } = renderHook(() => useFormStatus(handleFormCompletion), {
      wrapper: TestingContext,
    });
    act(() => result.current.setFormStatus('completed'));
    expect(handleFormCompletion).toHaveBeenCalledTimes(1);
  });
});

describe('useFormErrorHandling', () => {
  const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {
    // do nothing
  });
  const setStatus = jest.fn();
  const setResult = jest.fn();

  describe('generic error', () => {
    const genericError = new Error('Sample error');

    test('error reporting', () => {
      const { result } = renderHook(
        () => useFormErrorHandling(setStatus, setResult),
        {
          wrapper: TestingContext,
        }
      );
      act(() => result.current.handleFormError(genericError));
      expect(consoleError).toHaveBeenCalledTimes(1);
      expect(setResult).toHaveBeenCalledTimes(1);
      expect(setResult).toHaveBeenCalledWith({ error: 'Sample error' });
    });

    test('state reset', () => {
      const { result } = renderHook(
        () => useFormErrorHandling(setStatus, setResult),
        {
          wrapper: TestingContext,
        }
      );
      act(() => result.current.handleFormError(genericError));
      expect(setStatus).toHaveBeenCalledTimes(1);
      expect(setStatus).toHaveBeenCalledWith('valid');
    });
  });

  describe('field error', () => {
    const fieldError = new FieldError('test', 'Sample error');

    test('error state forwarding', () => {
      const { result } = renderHook(
        () => useFormErrorHandling(setStatus, setResult),
        {
          wrapper: TestingContext,
        }
      );
      act(() => result.current.handleFormError(fieldError));
      expect(result.current.fieldError).toBe(fieldError);
    });
  });
});
