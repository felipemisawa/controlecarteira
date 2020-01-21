import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OrderSavePage } from './order-save.page';

describe('OrderSavePage', () => {
  let component: OrderSavePage;
  let fixture: ComponentFixture<OrderSavePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderSavePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OrderSavePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
