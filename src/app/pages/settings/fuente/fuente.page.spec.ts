import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FuentePage } from './fuente.page';

describe('FuentePage', () => {
  let component: FuentePage;
  let fixture: ComponentFixture<FuentePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FuentePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FuentePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
