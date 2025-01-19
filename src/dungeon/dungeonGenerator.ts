import { scene } from '../init';
import { basicRoomGeometry } from './basicRoomGeometry'

const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]]; // +y, +x, -y, -x

const numberOfRooms = 10
const grid = new Array(numberOfRooms).fill(0).map(() => new Array(numberOfRooms).fill(0))
const gridPosition = [0, 0]
grid[0][0] = 1

const getAvailablePositions = () => {
    const availablePositions = []
    if (gridPosition[0] + 1 < numberOfRooms) { // x
        availablePositions.push(directions[1])
    }
    if (gridPosition[1] + 1 < numberOfRooms) { // y
        availablePositions.push(directions[0])
    }
    if (gridPosition[0] - 1 >= 0) { // x
        availablePositions.push(directions[3])
    }
    if (gridPosition[1] - 1 >= 0) { // y
        availablePositions.push(directions[2])
    }

    for (let i = 0; i < availablePositions.length; i++) {
        if (grid[gridPosition[0] + availablePositions[i][0]][gridPosition[1] + availablePositions[i][1]] === 1) {
            availablePositions.splice(i, 1)
        }
    }

    return availablePositions
}

const isInsideGrid = (x: number, y: number) => {
    return x >= 0 && x < numberOfRooms && y >= 0 && y < numberOfRooms
}

const getWallsFromNeighbors = (gridPosition: number[]) => {
    const yPos = gridPosition[0];
    const xPos = gridPosition[1];
    const walls = []

    if (!isInsideGrid(xPos, yPos - 1) || grid[yPos - 1][xPos] === 0) { // top
        walls.push("top")
    }
    if (!isInsideGrid(xPos, yPos + 1) || grid[yPos + 1][xPos] === 0) { // bottom
        walls.push("bottom")
    }
    if (!isInsideGrid(xPos + 1, yPos) || grid[yPos][xPos + 1] === 0) { // right
        walls.push("right")
    }
    if (!isInsideGrid(yPos, xPos - 1) || grid[yPos][xPos - 1] === 0) { // left
        walls.push("left")
    }

    return walls
}

export const generateDungeon = () => {
    let lastRoom = [0, 0];

    for (let i = 0; i < numberOfRooms * 2; i++) {
        const availablePositions = getAvailablePositions()
        const randomDirection = availablePositions[Math.floor(Math.random() * availablePositions.length)]

        gridPosition[0] += randomDirection[0]
        gridPosition[1] += randomDirection[1]

        // Update grid
        grid[gridPosition[0]][gridPosition[1]] = 1 
        lastRoom = gridPosition
    }

    for (let y = 0; y < numberOfRooms; y++) {
        for (let x = 0; x < numberOfRooms; x++) {
            if (grid[y][x] === 1) {
                const firstRoom = "green"
                const endRoom = "red"
                const randomColor = "lightblue"
                const color = x === 0 && y === 0 ? 
                    firstRoom : y === lastRoom[0] && x === lastRoom[1] ? 
                    endRoom : randomColor
                const walls = getWallsFromNeighbors([y, x])
                const { room, roomSize } = basicRoomGeometry(color, walls)
                room.position.set(x * roomSize.x, 0, y * roomSize.z)
            } else{
                const { room, roomSize } = basicRoomGeometry("black", [])
                room.position.set(x * roomSize.x, 0, y * roomSize.z)
            }
        }
    }
}