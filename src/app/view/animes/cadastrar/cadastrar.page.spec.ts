import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CadastrarPage } from './cadastrar.page';

describe('CadastrarPage', () => {
  let component: CadastrarPage;
  let fixture: ComponentFixture<CadastrarPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CadastrarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
