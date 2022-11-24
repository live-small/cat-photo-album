export const isBoolean = (value) => typeof value === 'boolean';

export const isObject = (value) => typeof value === 'object';

export const isNumber = (value) => typeof value === 'number';

export const isString = (value) => typeof value === 'string';

export const isValidNodes = (nodes) => {
  if (!Array.isArray(nodes)) return;

  const requiredProperty = ['id', 'name', 'type'];

  return nodes.every((node) => {
    if (!isObject(node)) return false;
    return requiredProperty.every((property) => property in node);
  });
};

export const isValidPaths = (paths) => {
  if (!Array.isArray(paths)) return;
  return paths.every((path) => isNumber(Number(path)));
};
