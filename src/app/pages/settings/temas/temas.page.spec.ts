import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TemasPage } from './temas.page';

describe('TemasPage', () => {
  let component: TemasPage;
  let fixture: ComponentFixture<TemasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TemasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
