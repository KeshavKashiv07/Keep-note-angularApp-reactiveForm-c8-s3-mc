import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule, By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { UserServiceStub } from './userServiceStub';
import { RegisterFormComponentComponent } from 'src/app/register-form-component/register-form-component.component';
import { NoteService } from 'src/app/service/note.service';


describe('RegisterFormComponent', () => {
    let component: RegisterFormComponentComponent;
    let fixture: ComponentFixture<RegisterFormComponentComponent>;
    let userService: NoteService

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [RegisterFormComponentComponent],
            imports: [
                BrowserModule,
                FormsModule,
                HttpClientModule,
                BrowserAnimationsModule,
                MatCardModule,
                MatExpansionModule,
                MatToolbarModule,
                MatIconModule,
                MatButtonModule,
                MatFormFieldModule,
                MatInputModule,
                MatRippleModule,
                MatSnackBarModule,
                ReactiveFormsModule,
                MatDatepickerModule,
                MatNativeDateModule,
                MatRadioModule,
                MatChipsModule,
                MatSnackBarModule,
                ReactiveFormsModule
            ],
            providers: [{ provide: NoteService, useClass: UserServiceStub }]
        })
            .compileComponents();
        fixture = TestBed.createComponent(RegisterFormComponentComponent);
        userService = TestBed.inject(NoteService);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create 11 mat-form-field, 1 mat-radio-group and 2 mat-button elements', () => {
        const formElement = fixture.debugElement.query(By.css('form'));
        expect(formElement.queryAll(By.css('mat-form-field')).length).toEqual(11);
        expect(formElement.queryAll(By.css('mat-form-field [matInput]')).length).toEqual(11);
        expect(formElement.queryAll(By.css('mat-radio-group')).length).toEqual(1);
        expect(formElement.queryAll(By.css('button[type="submit"]')).length).toEqual(1);
        expect(formElement.queryAll(By.css('button[type="reset"]')).length).toEqual(1);
    });

    it('register form should be invalid when form fields are empty', () => {
        expect(component.registerForm.valid).toBeFalsy();
        const submitButton: HTMLButtonElement = fixture.debugElement.nativeElement.querySelector("button[type='submit']");
        fixture.detectChanges();
        expect(submitButton.disabled).toBeTruthy();

    });

    it('Required form fields should have invalid status initially when no values are provided', () => {
        let firstName = component.registerForm.controls['firstName'];
        expect(firstName.valid).toBeFalsy();
        expect(firstName?.errors?.['required']).toBeTruthy();
      
        let email = component.registerForm.controls['email'];
        expect(email.valid).toBeFalsy();
        expect(email?.errors?.['required']).toBeTruthy();

        let password = component.registerForm.controls['password'];
        expect(password.valid).toBeFalsy();
        expect(password?.errors?.['required']).toBeTruthy();

        let confirmPassword = component.registerForm.controls['confirmPassword'];
        expect(confirmPassword.valid).toBeFalsy();
        expect(confirmPassword?.errors?.['required']).toBeTruthy();

    });

    it('should accept valid values for firstName', () => {
        let firstName = component.registerForm.controls['firstName'];
        firstName.setValue('john');
        expect(firstName.valid).toBeTruthy();
    });

    it('should be invalid when firstName have length less than 2 characters', () => {
        let firstName = component.registerForm.controls['firstName'];
        firstName.setValue('m');
        expect(firstName.valid).toBeFalsy();
        expect(firstName.errors?.['minlength']).toBeTruthy();
    });

    it('should be invalid when email values does not match the specified pattern', () => {
        let email = component.registerForm.controls['email'];
        email.setValue('mathew');
        expect(email.valid).toBeFalsy();
        expect(email?.errors?.['pattern']).toBeTruthy();
    });

    it('should be invalid when password and confrimPassword values does not contain the specified pattern', () => {
        let password = component.registerForm.controls['password'];
        password.setValue('mathew');
        expect(password.valid).toBeFalsy();
        expect(password?.errors?.['pattern']).toBeTruthy();

        let confirmPassword = component.registerForm.controls['confirmPassword'];
        confirmPassword.setValue('mathew');
        expect(confirmPassword.valid).toBeFalsy();
        expect(confirmPassword?.errors?.['pattern']).toBeTruthy();
    });


    it('should be invalid when password and confirmPassword does not match', () => {
        let password = component.registerForm.controls['password'];
        password.setValue('Math@123');
        let confirmPassword = component.registerForm.controls['confirmPassword'];
        confirmPassword.setValue('Math@1234');
        expect(component.registerForm.valid).toBeFalsy();
        expect(component.registerForm.errors?.['passwordMismatch']).toBeTruthy();

    });

    it('should be invalid when age is less than 18', () => {
        let age = component.registerForm.controls['age'];
        age.setValue(12);
        expect(age.valid).toBeFalsy();
        expect(age?.errors?.['invalidAge']).toBeFalsy();
    });

    it('should be invalid when phone number does not match the specified pattern', () => {
        let phone = component.registerForm.controls['phone'];
        phone.setValue('6710324');
        expect(phone.valid).toBeFalsy();
        expect(phone?.errors?.['pattern']).toBeTruthy();
    });

    it('should be invalid when zip code is not having 5 or 6 digit numbers', () => {
        let zip = component.registerForm['controls'].address['controls'].zipCode;
        zip.setValue('1000');
        expect(zip.valid).toBeFalsy();
        expect(zip?.errors?.['pattern']).toBeTruthy();
    });

    it('form should be valid when valid values are given for all form fields', fakeAsync(() => {
        component.registerForm.controls['firstName'].setValue('John')
        component.registerForm.controls['lastName'].setValue('Mathew');
        component.registerForm.controls['email'].setValue('john@gmail.com');
        component.registerForm.controls['password'].setValue('John@1234');
        component.registerForm.controls['confirmPassword'].setValue('John@1234');
        component.registerForm.controls['age'].setValue(23);
        component.registerForm.controls['phone'].setValue('9875632145');
        component.registerForm['controls'].address['controls'].zipCode.setValue('560033');
        const submitButton: HTMLButtonElement = fixture.debugElement.nativeElement.querySelector("button[type='submit']");
        fixture.detectChanges();
        expect(submitButton.disabled).toBeFalsy();
        expect(component.registerForm.valid).toBeTruthy();

        let spy = spyOn(userService, "addUser").and.callThrough();
        let form = fixture.debugElement.query(By.css('form'));
        let user = component.registerForm.value;
        form.triggerEventHandler("submit", {});
        //expect(spy).toHaveBeenCalledWith(user);
        expect(spy).toHaveBeenCalledTimes(1);
        flush();
    }))

});