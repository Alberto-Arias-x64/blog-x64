import { Pipe, PipeTransform } from '@angular/core'
import { formatDistanceToNow } from 'date-fns'
import { es } from 'date-fns/locale'

@Pipe({
    name: 'relativeDate',
    standalone: true
})
export class RelativeDatePipe implements PipeTransform {
    transform(value: Date | string, ...args: unknown[]): string | null {
        if (!value) return null
        let relativeDate = formatDistanceToNow(new Date(value), { locale: es , addSuffix: true })
        relativeDate = relativeDate.replace('alrededor de ','')
        return relativeDate
    }
}
