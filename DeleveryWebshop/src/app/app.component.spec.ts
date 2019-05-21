import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {NvbarComponent} from './shared/nvbar/nvbar.component';
import {ShowproductComponent} from "./products/showproduct/showproduct.component";
import {DOMHelper} from "../testing/DOMHelper";

describe('AppComponent', () => {
  let component: AppComponent ;
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
              ],
      declarations: [
        AppComponent,
        NvbarComponent
      ],
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

  });
  /*describe('title', () => {

    it('should be DeleveryWebshop', () => {
      expect(component.title).toBe('DeleveryWebshop');
    });
  });*/

});
