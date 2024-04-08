import { ValidationErrors,ValidatorFn,AbstractControl } from "@angular/forms";

export const matchPassword:ValidatorFn=(control:AbstractControl):ValidationErrors|null=>{
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if(password?.value !== confirmPassword?.value){
        return{passwordMismatch:true}
    }
    return null
}