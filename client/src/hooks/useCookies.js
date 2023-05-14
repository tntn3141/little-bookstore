import { useEffect, useState } from "react";
import Cookies from "universal-cookie";

export function useCookies(key, initialValue) {
  const cookies = new Cookies();

  const [value, setValue] = useState(() => {
    return cookies.set(key, [], { path: "/" });
    // const jsonValue = localStorage.getItem(key);
    // if (jsonValue != null) return JSON.parse(jsonValue);

    // if (typeof initialValue === "function") {
    //   return initialValue();
    // } else {
    //   return initialValue;
    // }
  });

  useEffect(() => {
    cookies.set(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
