export function add(a: number, b: number): number {
  return a + b;
}


export enum TypeValue {
  Boolean = 'boolean',
  Number = 'number',
  String = 'string',
  Function = 'function',
  Array = 'array',
  Date = 'date',
  RegExp = 'regexp',
  Undefined = 'undefined',
  Null = 'null',
  Object = 'object'
}

const TypeMap: Record<string, TypeValue> = {
  '[object Boolean]': TypeValue.Boolean,
  '[object Number]': TypeValue.Number,
  '[object String]': TypeValue.String,
  '[object Function]': TypeValue.Function,
  '[object Array]': TypeValue.Array,
  '[object Date]': TypeValue.Date,
  '[object RegExp]': TypeValue.RegExp,
  '[object Undefined]': TypeValue.Undefined,
  '[object Null]': TypeValue.Null,
  '[object Object]': TypeValue.Object
};

/**
 * Validate data type.
 * @method typeOf
 * @param {any} obj
 * @return {string}
 */
export function typeOf(obj: unknown): TypeValue {
  const toString = Object.prototype.toString;
  return TypeMap[toString.call(obj)];
}


/**
 * Data deep copy.
 * @method deepCopy
 * @param {array|object} data
 * @return {array|object}
 */
export function deepCopy<T>(data: T): T {
  const type: TypeValue = typeOf(data);

  switch (type) {
    case TypeValue.Array: {
      const array: unknown[] = [];
      for (let index = 0; index < (data as unknown[]).length; index++) {
        array.push(deepCopy(data[index]));
      }
      return array as T;
    }

    case TypeValue.Object: {
      const object: Record<string, unknown> = {};
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          object[key] = deepCopy(data[key]);
        }
      }
      return object as T;
    }

    default:
      return data;
  }
}


/**
 * Time and date formatting.
 * @method formatDate
 * @param {string|date} time
 * @return {string}
 */
export function formatDate(time: string | Date, format = 'yyyy-MM-dd hh:mm:ss'): string {
  const date: Date = time ? new Date(time) : new Date();
  const dateValues: Record<string, number> = {
    'M+': date.getMonth() + 1, // 月
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds() // 毫秒
  };

  if (/(y{4})/.test(format)) {
    format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }

  for (const key in dateValues) {
    if (new RegExp('(' + key + ')').test(format)) {
      const value = dateValues[key].toString();
      format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? value : ('00' + value).substr(value.length));
    }
  }

  return format;
}