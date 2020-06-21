import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

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
  constructor() {}

  ngOnInit(): void {
    this.canvas_obj = this.canvas.nativeElement as HTMLCanvasElement;
    this.ctx = this.canvas_obj.getContext('2d');
    this.resizeCanvas(500, 500);
  }

  resizeCanvas(height, width): void {
    this.canvas_obj.height = height;
    this.canvas_obj.width = this.canvas_obj.height * (16 / 9);
  }

  imageToCanvas(img_src, x, y, height, width): void {
    let img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = img_src;
    this.ctx.drawImage(img, x, y, width, height);
  }

  onDrop(event) {
    event.preventDefault();
    var data = event.dataTransfer.getData('text');
    let img = document.getElementById(data) as HTMLImageElement;
    let img_src = img.getAttribute('src');
    let pos = this.getMousePos(event);
    this.imageToCanvas(
      img_src,
      pos.x - img.width / 2,
      pos.y - img.height / 2,
      img.height,
      img.width
    );
  }

  onDragOver(event) {
    event.preventDefault();
  }

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
    link.download = 'filename.png';
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
}
