import { GenericType, Sizes } from '@/lib/definitions';

export function getFromAPItoGenericFormat(
  object: { data: GenericType[] } | undefined
) {
  if (!object || !object.data) {
    return [];
  }
  return object?.data.map((element: any) => ({
    id: element.id,
    name: element.attributes.name,
    selected: false,
  }));
}

export function getFromAPItoSizesFormat(object: { data: Sizes[] } | undefined) {
  if (!object || !object.data) {
    return [];
  }
  return object?.data.map((element: any) => ({
    id: element.id,
    value: element.attributes.value,
    selected: false,
  }));
}
