import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ejemplocompoennt } from './ejemplocompoennt';

describe('Ejemplocompoennt', () => {
  let component: Ejemplocompoennt;
  let fixture: ComponentFixture<Ejemplocompoennt>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ejemplocompoennt]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ejemplocompoennt);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
