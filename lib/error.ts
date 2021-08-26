/** A custom error that holds information about a specific form field. */
export class FieldError extends Error {
  name: string;

  constructor(name: string, message?: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = name;
  }
}
