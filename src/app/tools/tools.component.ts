import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.css'],
})
export class ToolsComponent implements OnInit {
  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D;
  private canvas_obj: any;
  imageTemplates: any = [];
  private texts: any = [];
  constructor(private _httpService: HttpService) {}
  ngOnInit(): void {
    this.canvas_obj = this.canvas.nativeElement as HTMLCanvasElement;
    this.ctx = this.canvas_obj.getContext('2d');
    this.resizeCanvas(500);
  }

  ngAfterViewInit() {
    this._httpService.getImages({}).subscribe((res: any) => {
      this.imageTemplates = res;
    });
  }

  resizeCanvas(height): void {
    this.canvas_obj.height = height;
    this.canvas_obj.width = this.canvas_obj.height * (16 / 9);
  }

  imageToCanvas(img, x, y, height, width): void {
    this.ctx.drawImage(img, x, y, width, height);
  }

  onDrop(event) {
    event.preventDefault();
    var data = event.dataTransfer.getData('text');
    let img = document.getElementById(data) as HTMLImageElement;
    let pos = this.getMousePos(event);
    this.imageToCanvas(
      img,
      pos.x - img.width / 2,
      pos.y - img.height / 2,
      img.height,
      img.width
    );
  }

  onDragOver(event) {
    event.preventDefault();
  }

  canvasMouseMove(e) {}

  onDragStart(event) {
    event.dataTransfer.effectAllowed = 'copyMove';
    event.dataTransfer.setData('text/plain', event.target.id);
    let img = document.getElementById(event.target.id);
    event.dataTransfer.setDragImage(
      img,
      img.clientHeight / 2,
      img.clientWidth / 2
    );
  }

  downloadCanvas() {
    var link = document.createElement('a');
    link.download = 'canvas_image.png';
    link.href = this.canvas_obj.toDataURL();
    link.click();
  }

  getMousePos(evt): any {
    var rect = this.canvas_obj.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top,
    };
  }
  addText(): any {
    // this.ctx.clearRect(0, 0, this.canvas_obj.width, this.canvas_obj.height);

    let inputbox_val = (document.getElementById(
      'canvas_input'
    ) as HTMLInputElement).value;

    this.ctx.font = '16px verdana';

    let y = this.texts.length * 20 + 20;
    let text = {
      text: inputbox_val,
      x: 20,
      y: y,
    };

    this.texts.push(text);
    for (let i = 0; i < this.texts.length; i++) {
      let text = this.texts[i];
      this.ctx.fillText(text.text, text.x, text.y);
    }
  }
}
