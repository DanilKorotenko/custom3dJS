class CanvasController
{
    static BACKGROUND = "#101010";
    static FOREGROUND = "#50ff50";

    static WIDTH = 800;
    static HEIGHT = 800;

    static POINT_SIZE = 20;

    constructor(aCanvas)
    {
        this.canvas = aCanvas;
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = CanvasController.WIDTH;
        this.canvas.height = CanvasController.HEIGHT;
    }

    clear()
    {
        this.ctx.fillStyle = CanvasController.BACKGROUND;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    point(aPoint)
    {
        this.ctx.fillStyle = CanvasController.FOREGROUND;
        this.ctx.fillRect(
            aPoint.x - (CanvasController.POINT_SIZE / 2),
            aPoint.y - (CanvasController.POINT_SIZE / 2),
            CanvasController.POINT_SIZE, CanvasController.POINT_SIZE);
    }

    line(aPoint2d1, aPoint2d2)
    {
        this.ctx.lineWidth = 3;
        this.ctx.strokeStyle = CanvasController.FOREGROUND;
        this.ctx.beginPath();
        this.ctx.moveTo(aPoint2d1.x, aPoint2d1.y);
        this.ctx.lineTo(aPoint2d2.x, aPoint2d2.y);
        this.ctx.stroke();
    }

    // converts point coordinates to screen coordinates
    convertToScreen(aPoint)
    {
        const result =
        {
            x: (aPoint.x + 1) / 2 * this.canvas.width,
            y: (1 - (aPoint.y + 1) / 2) * this.canvas.height,
        };
        return result;
    }

    project3Dto2D(aPoint3d)
    {
        const point2d =
        {
            x: aPoint3d.x / aPoint3d.z,
            y: aPoint3d.y / aPoint3d.z,
        };
        return point2d;
    }

    frame(aPoints3d, aFaces3d, aTransformationFunction)
    {
        this.clear();
        for (const face of aFaces3d)
        {
            for (let i = 0; i < face.length; i++)
            {
                const a3d = aPoints3d[face[i]];
                const b3d = aPoints3d[face[(i + 1) % face.length]];

                const a2d = this.convertToScreen(this.project3Dto2D(aTransformationFunction(a3d)));
                const b2d = this.convertToScreen(this.project3Dto2D(aTransformationFunction(b3d)));
                this.line(a2d, b2d);
            }
        }
    }
}
