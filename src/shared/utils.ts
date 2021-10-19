export const toPromise = <T>(data: T): Promise<T> => {
  return Promise.resolve(data);
};
