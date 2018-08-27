export const after = (seconds) => {
  return new Promise(resolve => setTimeout(v => resolve(v), seconds * 1000))
}
