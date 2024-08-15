import { Directive, ElementRef, OnDestroy, OnInit, Renderer2, inject } from '@angular/core'

@Directive({
  selector: '[appShowBadges]',
  standalone: true
})
export class ShowBadgesDirective implements OnInit, OnDestroy {
  private readonly elementRef: ElementRef = inject(ElementRef)
  private readonly renderer: Renderer2 = inject(Renderer2)

  private observer!: IntersectionObserver

  ngOnInit() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0
    }

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.renderer.setStyle(this.elementRef.nativeElement, 'left', 'calc(100% + 1rem)')
          this.renderer.setStyle(this.elementRef.nativeElement, 'opacity', '1')
        } else {
          this.renderer.setStyle(this.elementRef.nativeElement, 'left', '90%')
          this.renderer.setStyle(this.elementRef.nativeElement, 'opacity', '0')
        }
      })
    }, options)

    this.observer.observe(this.elementRef.nativeElement)
  }

  ngOnDestroy() {
    this.observer.disconnect()
  }
}
