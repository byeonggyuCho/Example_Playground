// TODO: 유효기간을 지정하는 로직이 있으면 좋을듯

/**
 * @example
 * storage.set('foo', 'bar');
 * storage.set('foobar', { foo: 'bar' });
 * let foo = storage.get('foo'); // bar
 * storage.remove('foo');
 */
type Storage = {
  set(key: string, value: any): void;
  get(key: string): any;
  remove(key: string): void;
  clear(): void;
};

// local Storage에서 JSON 형태로 저장 / 불러오기 / 삭제 헬퍼
const storage: Storage = {
  set: (key: string, object: any) => {
    if (!localStorage) {
      return;
    }
    localStorage[key] = typeof object === 'string' ? object : JSON.stringify(object);
  },
  get: (key: string): any => {
    if (!localStorage) {
      return null;
    }

    if (!localStorage[key]) {
      return null;
    }

    try {
      const parsed = JSON.parse(localStorage[key]);
      return parsed;
    } catch (e) {
      return localStorage[key];
    }
  },
  remove: (key: string): void => {
    if (!localStorage) return;

    if (localStorage[key]) {
      localStorage.removeItem(key);
    }
  },
  /**
   * @description 초기화
   */
  clear() {
    if (localStorage.clear) {
      localStorage.clear();
    }
  },
};

export default storage;
