# simpleheat-ts
*Full ReadMe coming soon*

A typescript port of the simpleheat js library (http://mourner.github.io/simpleheat/demo/)

Some differences from the original JS version:
1. The draw method takes a canvas element as a paramter to render on to.
2. SimpleHeat constructor requires 2 "helper" canvas, that it uses to manipulate and set colors with



How to use: 

```ts
import { Num } from 'example-typescript-package';

const data = [[38, 20, 2], [38, 690, 3], [48, 30, 1], [48, 40, 1], [48, 670, 1], [58, 640, 1], [58, 680, 1], [67, 630, 1], [86, 10, 1], [86, 660, 1], [96, 0, 1], [96, 80, 1], [96, 530, 1], [96, 540, 2], [96, 560, 1], [96, 620, 1], [96, 640, 1], [105, 530, 1], [105, 560, 3], [105, 590, 1], [105, 610, 1], [115, 300, 1], [115, 310, 4], [125, 260, 1], [125, 280, 1], [125, 300, 1], [125, 500, 1], [125, 530, 1], [134, 250, 1], [134, 260, 1], [134, 280, 1], [144, 40, 1], [144, 260, 1], [144, 270, 4], [144, 320, 1], [144, 330, 1], [153, 220, 1], [163, 280, 1], [173, 120, 2], [182, 80, 1], [182, 120, 2], [192, 10, 1], [192, 120, 1], [192, 130, 2], [192, 190, 1], [192, 530, 1], [201, 120, 2], [201, 130, 1], [201, 150, 1], [201, 190, 1], [201, 240, 1], [201, 280, 1], [201, 290, 1], [201, 340, 1], [201, 390, 3], [201, 400, 2], [201, 420, 1], [201, 670, 1], [201, 710, 1], [201, 750, 1], [211, 160, 2], [211, 280, 1], [211, 320, 1], [211, 340, 1], [211, 800, 2], [211, 810, 2], [221, 80, 1], [221, 140, 2], [221, 170, 1], [221, 180, 1], [221, 230, 1], [221, 420, 1], [221, 490, 2]];


this.heat = new SimpleHeat(document.createElement('canvas'), document.createElement('canvas'));

this.heat.data(data);
this.heat.max(18);

this.heat.draw(this.canvas.nativeElement, 0.05);
```


