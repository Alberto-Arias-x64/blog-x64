import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
    selector: 'app-svg-loader',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div [innerHTML]="svgContent"></div>
        <img [src]="svgUrl" [alt]="altText">
    `,
    styleUrls: ['./svg-loader.component.scss']
})
export class SvgLoaderComponent implements OnInit {
    @Input() svgPath!: string
    @Input() altText?: string
    @Input() fillColor?: string
    @Input() strokeColor?: string
    svgContent: any
    svgUrl?: SafeResourceUrl;
    private sanitizer = inject(DomSanitizer)

    ngOnInit(): void {
        this.loadSvg()
    }

    loadSvg() {
        fetch(this.svgPath)
            .then(response => response.text())
            .then(data => {
                // Modifica el contenido SVG con los colores personalizados
                this.svgContent = this.sanitizer.bypassSecurityTrustHtml(
                    this.applyColorsToSvg(data)
                );
                this.svgUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.svgPath);
            });
    }

    applyColorsToSvg(svgContent: string): string {
        let modifiedSvg = svgContent;

        // Reemplaza los colores originales con los colores personalizados
        modifiedSvg = modifiedSvg.replace(/fill="[^"]+"/g, `fill="${this.fillColor}"`);
        modifiedSvg = modifiedSvg.replace(/stroke="[^"]+"/g, `stroke="${this.strokeColor}"`);

        return modifiedSvg;
    }

}
