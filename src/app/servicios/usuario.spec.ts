import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { Usuario } from './usuario';

describe('Usuario', () => {
  let service: Usuario;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()],
    });
    service = TestBed.inject(Usuario);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
