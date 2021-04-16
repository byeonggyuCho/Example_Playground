// selectIds: (state: V) => EntityId[]
// selectEntities: (state: V) => Dictionary<T>
// selectAll: (state: V) => T[]
// selectTotal: (state: V) => number
// selectById: (state: V, id: EntityId) => T | undefined

type NormalizedData<Entity> = {
  [id: string]: Entity;
};

export const normalize = <Entity>(arr: Entity[], key = 'id'): NormalizedData<Entity> => {
  const initial: NormalizedData<Entity> = {};

  return arr.reduce((prev, cur) => {
    prev[key] = cur;

    return prev;
  }, initial);
};

type EnitityType = {
  id: string;
  normalizeDate: Date;
  [props: string]: any;
};

export const selectAll = <Entity extends EnitityType>(data: NormalizedData<Entity>): Entity[] => {
  return Object.entries(data)
    .map(([key, value]) => value)
    .sort((a, b) => {
      if (a.normalizeDate > b.normalizeDate) return -1;
      if (a.normalizeDate < b.normalizeDate) return 1;
      return 0;
    });
};

export const addOne = <Entity extends EnitityType>(
  data: NormalizedData<Entity>,
  entity: Entity
): NormalizedData<Entity> => {
  return {
    ...data,
    [entity.id]: {
      ...entity,
      normalizeDate: new Date(),
    },
  };
};

export default {
  normalize,
  selectAll,
  addOne,
};
