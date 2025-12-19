import { authGuard } from './auth-guard';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '@services/auth';
import { Router } from '@angular/router';
import { TestBed } from '@angular/core/testing';

describe('authGuard', () => {
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(() => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['decodeJWT']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
      ]
    });
  });

  function mockSnapshot(url: string): RouterStateSnapshot {
    return { url } as RouterStateSnapshot;
  }

  afterEach(() => {
    localStorage.clear();
  });

  it('should return false and redirect if token is missing', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);

    const result = authGuard({} as ActivatedRouteSnapshot, mockSnapshot('/admin-dashboard'));
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
    expect(result).toBeFalse();
  });

  it('should allow access to admin-dashboard for ADMIN role', () => {
    spyOn(localStorage, 'getItem').and.returnValue('token');
    mockAuthService.decodeJWT.and.returnValue({ role: 'ADMIN' });

    const result = authGuard({} as ActivatedRouteSnapshot, mockSnapshot('/admin-dashboard'));
    expect(result).toBeTrue();
  });

  it('should allow access to doctor-dashboard for DOCTOR role', () => {
    spyOn(localStorage, 'getItem').and.returnValue('token');
    mockAuthService.decodeJWT.and.returnValue({ role: 'DOCTOR' });

    const result = authGuard({} as ActivatedRouteSnapshot, mockSnapshot('/doctor-dashboard'));
    expect(result).toBeTrue();
  });

  it('should allow access to patient-dashboard for PATIENT role', () => {
    spyOn(localStorage, 'getItem').and.returnValue('token');
    mockAuthService.decodeJWT.and.returnValue({ role: 'PATIENT' });

    const result = authGuard({} as ActivatedRouteSnapshot, mockSnapshot('/patient-dashboard'));
    expect(result).toBeTrue();
  });

  it('should allow access to employee-dashboard for EMPLOYEE role', () => {
    spyOn(localStorage, 'getItem').and.returnValue('token');
    mockAuthService.decodeJWT.and.returnValue({ role: 'EMPLOYEE' });

    const result = authGuard({} as ActivatedRouteSnapshot, mockSnapshot('/employee-dashboard'));
    expect(result).toBeTrue();
  });

  it('should deny access if role does not match route', () => {
    spyOn(localStorage, 'getItem').and.returnValue('token');
    mockAuthService.decodeJWT.and.returnValue({ role: 'PATIENT' });

    const result = authGuard({} as ActivatedRouteSnapshot, mockSnapshot('/admin-dashboard'));
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
    expect(result).toBeFalse();
  });
});
