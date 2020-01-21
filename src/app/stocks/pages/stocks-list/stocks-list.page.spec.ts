import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StocksListPage } from './stocks-list.page';

describe('StocksListPage', () => {
  let component: StocksListPage;
  let fixture: ComponentFixture<StocksListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StocksListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StocksListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
