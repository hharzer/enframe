export async function pore<T>(promise: Promise<T>): Promise<[T, Error]> {
  try {
    const data = await promise
    return [data, null]
  } catch (error) {
    console.log(error)
    return [null, error]
  }
}
