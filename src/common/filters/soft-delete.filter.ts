import { Filter } from '@mikro-orm/core';

export type SoftDeleteOptions = {
  enabled?: boolean;
  defaultIsDeleted?: boolean;
  field?: string;
};

const defaultOptions = {
  enabled: true,
  defaultIsDeleted: false,
  field: 'dateDeleted',
};

export const SoftDelete = (options: SoftDeleteOptions = {}): ClassDecorator => {
  const { enabled, defaultIsDeleted, field } = {
    ...defaultOptions,
    ...options,
  };
  return Filter({
    name: 'softDelete',
    cond: ({ isDeleted = defaultIsDeleted }: { isDeleted?: boolean } = {}) => {
      const filter = isDeleted
        ? { [field]: { $ne: null } }
        : isDeleted === false
        ? { [field]: null }
        : {};
      console.log({ isDeleted, filter, typeof: typeof isDeleted });
      return filter;
    },
    args: false,
    default: enabled,
  });
};
