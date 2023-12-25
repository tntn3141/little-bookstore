import { useEffect } from "react";

// Usage example:
// 1 - Initiate the hook:
// const wrapperRef = useRef(null);
// useOutsideClick(callback, wrapperRef);
// 2 - Add attribute ref={wrapperRef} to the element that needs tracking clicks outside of it:
// <div ref={wrapperRef}> ... </div>

// Invoke callback when detecting clicks outside the element with ref
export const useOutsideClick = (callback, ref) => {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
};
