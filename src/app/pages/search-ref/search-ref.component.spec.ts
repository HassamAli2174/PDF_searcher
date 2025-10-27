import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchRefComponent } from './search-ref.component';

describe('SearchRefComponent', () => {
  let component: SearchRefComponent;
  let fixture: ComponentFixture<SearchRefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchRefComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchRefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
