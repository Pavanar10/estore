import { Component,OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { AbstractControl,Validators } from '@angular/forms';
import { matchPassword } from '../validators/match.password.validators';
import { UserService } from '../../../services/users/user-service.service';
import { user } from 'src/app/home/types/user.type';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.scss'],

})
export class UserSignupComponent implements OnInit {
  userSignup:FormGroup;
  alertMessage='';
  alertType:number=0;
  constructor(private fb:FormBuilder,private userService:UserService){

  }

  ngOnInit(): void {
    this.userSignup=this.fb.group({
      firstName:['',Validators.required],
      lastName:[''],
      email:['',[Validators.required,Validators.email]],
      address:[''],
      city:[''],
      state:[''],
      pin:[''],
      password:['',Validators.required],
      confirmPassword:['',Validators.required]
    },
    {
      validator:matchPassword
    })
  }
  get firstName():AbstractControl<any,any>|null{
    return this.userSignup.get('firstName')
  }
  get email():AbstractControl<any,any>|null{
    return this.userSignup.get('email')
  }
  get password():AbstractControl<any,any>|null{
    return this.userSignup.get('password')
  }
  get confirmPassword():AbstractControl<any,any>|null{
    return this.userSignup.get('confirmPassword')
  }
  onSubmit(){
    const user:user={
      firstName:this.firstName?.value,
      email:this.email?.value,
      password:this.password?.value,
      lastName:this.userSignup.get('lastName')?.value,
      address:this.userSignup.get('address')?.value,
      city:this.userSignup.get('city')?.value,
      state:this.userSignup.get('state')?.value,
      pin:this.userSignup.get('pin')?.value,
    }

    this.userService.createUser(user).subscribe({
      next:(result)=>{
        if(result.message==='success'){
          this.alertMessage='User Created Successfully';
          this.alertType=0
        }else if(result.message==='Email already exists'){
          this.alertMessage=result.message;
          this.alertType=1;
        }

      },
      error:(error)=>{
        this.alertMessage=error.message;
        this.alertType=2;
      }
    })
  }
}
