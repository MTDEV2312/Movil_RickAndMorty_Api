import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CharactersDetailsPage } from './characters-details.page';

describe('CharactersDetailsPage', () => {
  let component: CharactersDetailsPage;
  let fixture: ComponentFixture<CharactersDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CharactersDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
