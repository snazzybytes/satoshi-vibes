// sporadically used for debugging purposes - expanded console
export function expandedLog(item, maxDepth = 100, depth = 0) {
  if (depth > maxDepth) {
    console.log(item)
    return
  }
  if (typeof item === "object" && item !== null) {
    Object.entries(item).forEach(([key, value]) => {
      console.group(key + " : " + typeof value)
      expandedLog(value, maxDepth, depth + 1)
      console.groupEnd()
    })
  } else {
    console.log(item)
  }
}
