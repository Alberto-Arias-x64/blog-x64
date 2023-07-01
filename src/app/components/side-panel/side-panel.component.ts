import { Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Router, RouterModule } from '@angular/router'
import { AuthService } from 'src/app/services/auth.service'

@Component({
    selector: 'app-side-panel',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './side-panel.component.html',
    styleUrls: ['./side-panel.component.scss']
})
export class SidePanelComponent {
    private readonly Router = inject(Router)
    private readonly Auth = inject(AuthService)

    logOut() {
        this.Auth.logOut()
        this.Router.navigate(['/'])
    }
}
