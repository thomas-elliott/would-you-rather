import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EnterNamePage } from './enter-name.page';

describe('EnterNamePage', () => {
  let component: EnterNamePage;
  let fixture: ComponentFixture<EnterNamePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterNamePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EnterNamePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
