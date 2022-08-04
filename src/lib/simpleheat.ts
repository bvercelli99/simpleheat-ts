import { HeatPoint } from "./heatpoint.model";


export class SimpleHeat {
  //private _canvas: HTMLCanvasElement;
  private _circleCanvas: HTMLCanvasElement;
  private _gradientCanvas: HTMLCanvasElement;

  //private _ctx: CanvasRenderingContext2D;
  //private _width: number;
  //private _height: number;
  private _max: number = 1;
  private _data: HeatPoint[] = [];
  private _defaultRadius: number = 25;
  private _radius: number = 0;
  private _gradient: Uint8ClampedArray = new Uint8ClampedArray();
  private _defaultGradientRamp: { [key: number]: string } = {
    0.4: 'blue',
    0.6: 'cyan',
    0.7: 'lime',
    0.8: 'yellow',
    1.0: 'red'
  };

  constructor(circleHelperCanvas: HTMLCanvasElement, gradientHelperCanvas: HTMLCanvasElement) {
    this._circleCanvas = circleHelperCanvas;
    this._gradientCanvas = gradientHelperCanvas;

    this.gradient(this._defaultGradientRamp);
    this.radius(this._defaultRadius);

    //this._canvas = canvas;// = typeof canvas === 'string' ? document.getElementById(canvas) : canvas;
    //this._ctx = this._canvas.getContext('2d');
    //this._width = canvas.width;
    //this._height = canvas.height;

    this._data = [];
  }

  data(data: HeatPoint[]): void {
    this._data = data;
  }

  max(m: number): void {
    this._max = m;
  }

  add(point: HeatPoint): void {
    this._data.push(point);
  }

  clear(): void {
    this._data = [];
  }

  radius(radius: number, blur?: number) {
    blur = blur === undefined ? 15 : blur;

    // create a grayscale blurred circle image that we'll use for drawing points
    let circle = this._circleCanvas;
    let ctx = circle.getContext('2d');

    if (null != ctx) {
      let r2 = this._radius = radius + blur;

      circle.width = circle.height = r2 * 2;

      ctx.shadowOffsetX = ctx.shadowOffsetY = r2 * 2;
      ctx.shadowBlur = blur;
      ctx.shadowColor = 'black';

      ctx.beginPath();
      ctx.arc(-r2, -r2, radius, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.fill();
    }

  }
  gradient(grad: { [key: number]: string }) {
    // create a 256x1 gradient that we'll use to turn a grayscale heatmap into a colored one
    let canvas = this._gradientCanvas;
    let ctx = canvas.getContext('2d');
    if (null != ctx) {

      let gradient = ctx.createLinearGradient(0, 0, 0, 256);

      canvas.width = 1;
      canvas.height = 256;

      for (var i in grad) {
        gradient.addColorStop(+i, grad[i]);
      }

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 1, 256);

      this._gradient = ctx.getImageData(0, 0, 1, 256).data;
    }
  }
  draw(canvas: HTMLCanvasElement, minOpacity: number) {
    //if (!this._circle) this.radius(this.defaultRadius);
    //if (!this._grad) this.gradient(this.defaultGradient);
    let width = canvas.width;
    let height = canvas.height;

    let ctx = canvas.getContext('2d');

    if (null != ctx) {
      ctx.clearRect(0, 0, width, height);

      // draw a grayscale heatmap by putting a blurred circle at each data point
      for (var i = 0, len = this._data.length, p; i < len; i++) {
        p = this._data[i];
        ctx.globalAlpha = Math.min(Math.max(p.weight / this._max, minOpacity === undefined ? 0.05 : minOpacity), 1);
        ctx.drawImage(this._circleCanvas, p.x - this._radius, p.y - this._radius);
      }

      // colorize the heatmap, using opacity value of each pixel to get the right color from our gradient
      var colored = ctx.getImageData(0, 0, width, height);
      this.colorize(colored.data, this._gradient);
      ctx.putImageData(colored, 0, 0);
    }
  }
  private colorize(pixels: Uint8ClampedArray, gradient: Uint8ClampedArray) {
    for (var i = 0, len = pixels.length, j; i < len; i += 4) {
      j = pixels[i + 3] * 4; // get gradient color from opacity value

      if (j) {
        pixels[i] = gradient[j];
        pixels[i + 1] = gradient[j + 1];
        pixels[i + 2] = gradient[j + 2];
      }
    }
  }


}