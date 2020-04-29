import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NoGamePage } from './no-game.page';

describe('NoGamePage', () => {
  let component: NoGamePage;
  let fixture: ComponentFixture<NoGamePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoGamePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NoGamePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
