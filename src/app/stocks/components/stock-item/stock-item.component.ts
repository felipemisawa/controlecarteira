import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Stock } from '../../models/stock.model';
import { StocksService } from '../../services/stocks/stocks.service';
import { OverlayService } from 'src/app/core/services/overlay.service';

@Component({
  selector: 'app-stock-item',
  templateUrl: './stock-item.component.html',
  styleUrls: ['./stock-item.component.scss']
})
export class StockItemComponent {
  alertTitle: string;
  constructor(private stocksService: StocksService, private overlayService: OverlayService) {}
  @Input() stock: Stock;
  @Output() show = new EventEmitter<Stock>();
  async saveLabel(): Promise<void> {
    if (this.stock.label === '') {
      this.alertTitle = 'Add label';
    } else {
      this.alertTitle = 'Edit label';
    }
    await this.overlayService.alert({
      header: this.alertTitle,
      inputs: [
        {
          name: 'label',
          placeholder: 'Add new label'
        }
      ],
      buttons: [
        {
          text: 'Ok',
          handler: async data => {
            if (data.label === '') {
              this.overlayService.alert({
                header: 'Label is required!',
                buttons: [
                  {
                    text: 'Ok',
                    handler: () => {
                      this.saveLabel();
                    }
                  }
                ]
              });
            } else {
              const loading = await this.overlayService.loading();
              try {
                this.stock.label = data.label;
                await this.stocksService.update(this.stock);
              } catch (error) {
                this.overlayService.toast({ message: `Error saving label: ${error.message}` });
              } finally {
                loading.dismiss();
              }
            }
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
  }
}
