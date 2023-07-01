import { Directive, ElementRef, HostListener, Renderer2, inject } from '@angular/core'

@Directive({
    selector: '[appZoomFilter]',
    standalone: true
})
export class ZoomFilterDirective {
    private elementRef = inject(ElementRef)
    private renderer = inject(Renderer2)

    @HostListener('mouseenter')
    onMouseEnter(): void {
        this.zoomIn()
    }

    @HostListener('mouseleave')
    onMouseLeave(): void {
        this.zoomOut()
    }

    private zoomIn(): void {
        this.renderer.setStyle(this.elementRef.nativeElement, 'transform', 'scale(1.1)')
        this.renderer.setStyle(this.elementRef.nativeElement, 'transition', 'transform 0.3s')
    }

    private zoomOut(): void {
        this.renderer.setStyle(this.elementRef.nativeElement, 'transform', 'scale(1)')
    }
}
