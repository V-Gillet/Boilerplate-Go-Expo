//see : https://github.com/seanpmaxwell/ts-validators/blob/master/src/validators.ts#L331
//todo: list rules here to reuse

//regex
const EMAIL_RGX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//types
export type TEmail = `${string}@${string}`;

// exports
export const isEmail = _isRgx<TEmail>(EMAIL_RGX);
export const isStr = _checkType<string>("string");
export const isNotEmpty = (arg: any): true | string => {
  switch (typeof arg) {
    case "string":
      if (arg.length !== 0) {
        return true;
      }
      return "Field required";
    case "object":
      if (arg !== null && Object.keys(arg).length > 0) {
        return true;
      }
      return "Field required";
    case "undefined":
      return "Field required";
    default:
      return true;
  }
};

function _isRgx<T>(rgx: RegExp) {
  return (arg: unknown): arg is T => {
    return isStr(arg) && arg.length < 254 && (arg === "" || rgx.test(arg));
  };
}

function _checkType<T>(type: string) {
  return (arg: unknown): arg is T => {
    return (
      typeof arg === type &&
      (type === "object" ? arg !== null : true) &&
      (type === "number" ? !isNaN(arg as number) : true)
    );
  };
}
