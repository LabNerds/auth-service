export const toPromise = <T>(data: T): Promise<T> => {
  return Promise.resolve(data);
};

export type MockType<T> = {
  [P in keyof T]: jest.Mock<any>;
};
