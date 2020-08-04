function getAllNodes(grid) {
    const nodes = [];
    for (const row of grid) {
        for (const node of row) {
            nodes.push(node);
        }
    }
    return nodes;
}


export default function dfs(grid, startNode, finishNode) {

    var stack = [];
    var visited = [];

    stack.unshift(startNode);

    const gridRow = grid.length;
    const gridCol = grid[0].length;

    const unvisitedNodes = getAllNodes(grid);

    const dr = [-1, 1, 0, 0];
    const dc = [0, 0, 1, -1];

    while (stack.length) {

        var currentNode = stack.pop();
        var neighbors = [];

        visited.push(currentNode);

        if (currentNode === finishNode) {
            return visited;
        }

        for (var node1 of unvisitedNodes) {
            for (let i = 0; i < 4; i++) {
                var r = currentNode.row + dr[i];
                var c = currentNode.col + dc[i];

                if ((0 < r < gridRow) && (0 < c < gridCol)) {
                    if (node1.row === r) {
                        if (node1.col === c) {
                            // if (!visited.includes(node1)) {
                            neighbors.push(node1);
                            // }
                        }
                    }
                }
            }

        }

        for (var neighbor of neighbors) {
            if (visited.includes(neighbor)) {
                stack.unshift(neighbor);
            }
        }

    }

}