import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

 
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  email=null;

  constructor(
    private auth:AuthService,
    private toastr:ToastrService,
    private router:Router
    ) { 
      auth.getUser().subscribe(
        (user) => {
          this.email=user?.email;
        })
    }
  ngOnInit(): void {
  }

  async handleSingOut(){
    try{
      const res = await this.auth.signOut();
      this.router.navigateByUrl('/singin');
      this.toastr.info('login again to continue');
      this.email=null;
    }
    catch(err){
      this.toastr.error('something went wrong');
    }
  }

  

}
