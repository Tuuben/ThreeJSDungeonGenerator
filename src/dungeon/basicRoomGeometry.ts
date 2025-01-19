import * as Three from 'three'
import { scene } from '../init'
import { createCube } from '../geometry'

const ALL_WALLS = ["top", "bottom", "left", "right"]

const getWallPosition = (wall: string, roomSize: Three.Vector3) => {
    let position = new Three.Vector3(0, 0, 0)
    let rotationAngle = 0.0 
    let debugColor = new Three.Color("red")

    if (wall === "top") {
        position = new Three.Vector3(0, roomSize.y, -roomSize.z / 2)
        rotationAngle = 0.0
        debugColor = new Three.Color("red")
    }
    if (wall === "bottom") {
        position = new Three.Vector3(0, roomSize.y, roomSize.z / 2)
        rotationAngle = 0.0
        debugColor = new Three.Color("green")
    }
    if (wall === "left") {
        position = new Three.Vector3(-roomSize.x / 2, roomSize.y, 0)
        rotationAngle = 90.0
        debugColor = new Three.Color("blue")
    }
    if (wall === "right") {
        position = new Three.Vector3(roomSize.x / 2, roomSize.y , 0)
        rotationAngle = 90.0
        debugColor = new Three.Color("purple")
    }

    return { position, rotationAngle, debugColor }
}

export const basicRoomGeometry = (
    color: Three.ColorRepresentation = "lightblue",
    roomWalls: string[] = ALL_WALLS 
) => {
    const room = new Three.Group()

    const roomSize = new Three.Vector3(5, 1, 5)
    const BaseRoomShape = createCube(roomSize, { color })
    room.add(BaseRoomShape)

    const roomExits: Three.Vector3[] = [];

    for (const wall of roomWalls) {
        const wallMesh = createCube(new Three.Vector3(roomSize.x, 2, 1), { color })
        room.add(wallMesh)
        const {position, rotationAngle, debugColor} = getWallPosition(wall, roomSize)
        wallMesh.position.x = position.x
        wallMesh.position.y = position.y
        wallMesh.position.z = position.z
        wallMesh.rotation.y = Three.MathUtils.DEG2RAD * rotationAngle
    }

    scene.add(room)
    return { room, roomExits, roomSize} 
}