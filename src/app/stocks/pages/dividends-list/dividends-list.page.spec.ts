import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DividendsListPage } from './dividends-list.page';

describe('DividendsListPage', () => {
  let component: DividendsListPage;
  let fixture: ComponentFixture<DividendsListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DividendsListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DividendsListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
