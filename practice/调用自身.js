// 获取下一个 元素 节点
function getNextElement(node) {
    if( node.nodeType == 1 ) {
        return node;
    }
    if (node.nextSibling) {
        return getNextElement(node.nextSibling);
    }
    return null;
}
