export function timeout() {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(false);
    }, 3000);
  });
}
