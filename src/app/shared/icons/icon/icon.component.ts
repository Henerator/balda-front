import {
  Component,
  HostBinding,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { DomSanitizer, SafeValue } from '@angular/platform-browser';
import { take } from 'rxjs';
import { IconLoaderService } from '../icon-loader.service';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
})
export class IconComponent implements OnChanges {
  @Input() public name!: string;

  @HostBinding('class.clickable')
  @Input()
  public clickable = true;

  public svgIcon: SafeValue | null = null;

  private readonly iconsPath = 'assets/icons';

  constructor(
    private readonly domSanitizer: DomSanitizer,
    private readonly iconLoaderService: IconLoaderService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    const nameChanges = changes['name'];

    if (
      nameChanges?.currentValue &&
      nameChanges.previousValue !== nameChanges.currentValue
    ) {
      this.iconLoaderService
        .loadIcon(`${this.iconsPath}/${this.name}.svg`)
        .pipe(take(1))
        .subscribe((icon) => {
          this.svgIcon = this.domSanitizer.bypassSecurityTrustHtml(icon);
        });
    }
  }
}
