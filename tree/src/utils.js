export const searchTreeNodePath = (nodeId, parent) => {
    const stack = [[parent, []]]
    while (stack.length) {
      const [node, path] = stack.pop()
      if (node.id === nodeId) {
        return path
      }
      if (node.children) {
        stack.push(...node.children.map((node, index) => (
          [node, [...path, { index, id: node.id }]])
        ))
      }
    }
  }
  
  const countLeafs = (item, count = 0) => {
    if (item.children && item.children.length) {
      return item.children.reduce((acc, item) => {
        if (item.children && item.children.length) {
          return countLeafs(item.children, count)
        } else {
          return acc + 1
        }
      }, count)
    }
  }
  
  export const countLineParams = (
    item,
    index,
    hasItemBelow,
    marginBottom,
    itemHeight
  ) => {
    const baseHeight = itemHeight + marginBottom
    const nestedChildrenCount = countLeafs(item)
    const top = itemHeight / 2
    const height = (hasItemBelow && !nestedChildrenCount)? baseHeight + 1 : baseHeight * nestedChildrenCount + 1
    return { top, height }
  }
