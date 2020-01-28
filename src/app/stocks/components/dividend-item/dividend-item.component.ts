import { Component, Input } from '@angular/core';
import { Dividend } from '../../models/dividend.model';

@Component({
  selector: 'app-dividend-item',
  templateUrl: './dividend-item.component.html',
  styleUrls: ['./dividend-item.component.scss'],
})
export class DividendItemComponent {

  @Input() dividend: Dividend;

}
