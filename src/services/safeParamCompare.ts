export function safeParamCompare<M>(param: keyof M) {
  return (a: M, b: M) => {
    if (a[param] && typeof a[param] === "string" && b[param] && typeof b[param] === 'string') {
      const paramA = a[param] as unknown as string;
      const paramB = b[param] as unknown as string;

      return paramA.localeCompare(paramB);
    }

    if (a[param]) {
      return -1;
    }

    if (b[param]) {
      return 1;
    }

    return 0;
  };
}
