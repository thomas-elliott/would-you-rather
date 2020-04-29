import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LoadGamePage } from './load-game.page';

describe('LoadGamePage', () => {
  let component: LoadGamePage;
  let fixture: ComponentFixture<LoadGamePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadGamePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LoadGamePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
