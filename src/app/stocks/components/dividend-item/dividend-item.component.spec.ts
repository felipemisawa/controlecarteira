import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DividendItemComponent } from './dividend-item.component';

describe('DividendItemComponent', () => {
  let component: DividendItemComponent;
  let fixture: ComponentFixture<DividendItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DividendItemComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DividendItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
