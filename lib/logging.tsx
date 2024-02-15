// sporadically used for debugging purposes - expanded console
export function expandedLog(item: unknown, maxDepth: number = 100, depth: number = 0): void {
  if (depth > maxDepth) {
    console.log(item)
    return
  }
  if (typeof item === "object" && item !== null) {
    // TypeScript doesn't know the structure of `item`, so we need to assert it as an object
    const obj = item as Record<string, unknown>
    Object.entries(obj).forEach(([key, value]) => {
      console.group(key + " : " + typeof value)
      expandedLog(value, maxDepth, depth + 1)
      console.groupEnd()
    })
  } else {
    console.log(item)
  }
}
