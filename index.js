let canvasController = null;
const FPS = 60;
const dt = 1 / FPS;
let angle = 0;

function onload()
{
    const canvas = document.getElementById('game');

    canvasController = new CanvasController(canvas);

    setTimeout(animate, 1000 / FPS);
}

const points =
[
    { x: 0.25, y: 0.25, z: 0.25, },
    { x: -0.25, y: 0.25, z: 0.25, },
    { x: -0.25, y: -0.25, z: 0.25, },
    { x: 0.25, y: -0.25, z: 0.25, },

    { x: 0.25, y: 0.25, z: -0.25, },
    { x: -0.25, y: 0.25, z: -0.25, },
    { x: -0.25, y: -0.25, z: -0.25, },
    { x: 0.25, y: -0.25, z: -0.25, },
];

const faces =
[
    [0, 1, 2, 3,],
    [4, 5, 6, 7,],
    [0, 4,],
    [1, 5,],
    [2, 6,],
    [3, 7,],
];

function translateZ(aPoint3d, aDeltaZ)
{
    const result =
    {
        x: aPoint3d.x,
        y: aPoint3d.y,
        z: aPoint3d.z + aDeltaZ,
    };
    return result;
}

function rotateXZ(aPoint3d, anAngle)
{
    const c = Math.cos(anAngle);
    const s = Math.sin(anAngle);

    const result =
    {
        x: aPoint3d.x * c - aPoint3d.z * s,
        y: aPoint3d.y,
        z: aPoint3d.x * s + aPoint3d.z * c,
    };
    return result;
}

function rotateYZ(aPoint3d, anAngle)
{
    const c = Math.cos(anAngle);
    const s = Math.sin(anAngle);

    const result =
    {
        x: aPoint3d.x,
        y: aPoint3d.y * c - aPoint3d.z * s,
        z: aPoint3d.x * s + aPoint3d.z * c,
    };
    return result;
}

function animate()
{
    angle += Math.PI * dt;

    canvasController.frame(points, faces,
        (aPoint) =>
        {
            return translateZ(rotateXZ(aPoint, angle), 1);
        });
    setTimeout(animate, 1000 / FPS);
}

window.addEventListener("load", onload);
