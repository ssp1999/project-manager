type Type = 'text' | 'date' | 'image' | 'boolean'

export const validateForm = (value: any, type: Type) => {
  switch (type) {
    case 'text':
      return value.length > 0
    case 'date':
      return !isNaN(Date.parse(value))
    case 'image':
      return true;
    case 'boolean':
      return value
  }

  return true
}