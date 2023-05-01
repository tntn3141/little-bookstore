export function getVNDPrice(value) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);
}

// Remove all falsy values ("", 0, false, null, undefined )
// Reference: https://stackoverflow.com/questions/286141/remove-blank-attributes-from-an-object-in-javascript
export function removeFalsyValues(array) {
  let result = Object.entries(array).reduce(
    (a, [k, v]) => (v ? ((a[k] = v), a) : a),
    {}
  );
  return result;
}
